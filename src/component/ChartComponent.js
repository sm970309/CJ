// src/components/HeartComponent.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../module/firebase';

const HeartComponent = () => {
  const [loveAmount, setLoveAmount] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const targetAmount = 500000; // 목표 금액

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectRef = doc(db, 'projects', 'projectData');
        const docSnap = await getDoc(projectRef);

        if (docSnap.exists()) {
          const fetchedData = docSnap.data();
          if (fetchedData.Love !== undefined) {
            setLoveAmount(fetchedData.Love);
          } else {
            console.log('No Love data found!');
          }
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
        setError('데이터를 불러오는데 실패했습니다.');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  const fillPercentage = Math.min((loveAmount / targetAmount) * 100, 100);
  const adjustment = (100000 - Math.min(loveAmount, 100000)) / 10000; // loveAmount에 따라 0에서 10 사이의 값을 계산
  const adjustedFillPercentage = Math.min(fillPercentage + adjustment, 100);
  const filledHeight = (118.4 * adjustedFillPercentage) / 100;

  const handleImageClick = (index) => {
    navigate(`/detail?image=${index + 1}`);
  };

  return (
    <div className="component-container" style={{ textAlign: 'center' }}>
      <h2>플로잉 현황</h2>
      <div
        style={{
          position: 'relative',
          width: '300px',
          height: '300px',
          margin: '0 auto',
        }}
      >
        <svg viewBox="-6 0 140 118.4" style={{ width: '100%', height: '100%', textAlign: 'center' }}>
          <defs>
            <clipPath id="heartClip">
              <path
                d="M94.4,0c-13.6,0-24.4,10.8-30.4,17.2C58,10.8,47.2,0,33.6,0C14.8,0,0,14.8,0,33.6
              c0,22.8,30.8,43.6,64,72.4C97.2,77.2,128,56.4,128,33.6C128,14.8,113.2,0,94.4,0z"
              />
            </clipPath>
          </defs>
          <rect x="0" y={`${118.4 - filledHeight}`} width="128" height={filledHeight} fill="red" clipPath="url(#heartClip)" />
          <path
            d="M94.4,0c-13.6,0-24.4,10.8-30.4,17.2C58,10.8,47.2,0,33.6,0C14.8,0,0,14.8,0,33.6
            c0,22.8,30.8,43.6,64,72.4C97.2,77.2,128,56.4,128,33.6C128,14.8,113.2,0,94.4,0z"
            fill="none"
            stroke="red"
            strokeWidth="2"
          />
        </svg>
      </div>
      <p>{`현재 금액: ${loveAmount.toLocaleString()} / ${targetAmount.toLocaleString()}`}</p>

      <FlowingList>
        {Array.from({ length: 8 }).map((_, index) => (
          <FlowingBox>
            <FlowingBoxTop>
              <Image
                key={index}
                // src={`${process.env.PUBLIC_URL}/pro${index + 1}.png`} // 각 이미지를 URL로 교체
                src={`${process.env.PUBLIC_URL}/sample.jpg`}
                alt={`Programm ${index + 1}`}
                className="image-item"
                onClick={() => handleImageClick(index)}
                style={{ cursor: 'pointer' }}
              />
              <FlowingDesc>함께 찬양해요!</FlowingDesc>
              <FlowingTag>찬양 시간</FlowingTag>
            </FlowingBoxTop>
            <FlowingBoxBottom>목표 금액: 0원</FlowingBoxBottom>
          </FlowingBox>
        ))}
      </FlowingList>
    </div>
  );
};

export default HeartComponent;

const FlowingList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.8rem;
`;

const FlowingBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 0.1rem solid rgb(222, 226, 230);
  border-radius: 0.8rem;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  max-width: 100%;
  height: auto;
`;

const FlowingBoxTop = styled.div`
  border-bottom: 1px solid #f5f5f5;
  text-align: start;
`;

const FlowingDesc = styled.div`
  width: 100%;
  padding: 0.8rem;
  font-size: 1%.6;
`;

const FlowingTag = styled.div`
  padding: 0.8rem;
  font-size: 1.4rem;
  color: gray;
`;

const FlowingBoxBottom = styled.div`
  width: 100%;
  padding: 0.8rem;
  text-align: start;
`;
