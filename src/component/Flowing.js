// src/components/HeartComponent.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../module/firebase';

export const Flowing = () => {
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

  const getImageContent = (imageNumber) => {
    switch (imageNumber) {
      case 1:
        return '"하나님은 000을 사랑해" 큰 종이와 부채로 서로를 소개하고 알아가요.';
      case 2:
        return '"목소리로! 표정으로! 온몸으로!" 신나게 찬양해요.';
      case 3:
        return '"미움 다툼 시기 질투 버리고 우리 서로 사랑해" 하나님 안에서 공동체를 세워가요. ';
      case 4:
        return '"하나님이 나를 엄청 사랑하신대" 선생님들이 직접 연기하고 춤추고 노래하는 연극을 관람해요.';
      case 5:
        return '"사랑으로의 초대" 삼삼오오 모여서 복음을 나눠요.';
      case 6:
        return '"와 여름이다!!" 더운 여름 계곡에서 신나게 물놀이를 해요.';
      case 7:
        return '완벽한 레시피는 없어! 뭘 넣어도 화채는 맛있지!';
      case 8:
        return '"아름다운 마음들이 모여서" 살미 순복음 교회의 수요예배를 함께 드려요.';
      default:
        return '알 수 없는 프로그램 번호입니다.';
    }
  };

  const getImageTitle = (imageNumber) => {
    switch (imageNumber) {
      case 1:
        return '아이스브레이킹';
      case 2:
        return '찬양 율동';
      case 3:
        return '레크레이션 및 부스활동';
      case 4:
        return '연극';
      case 5:
        return '3일차 예배';
      case 6:
        return '물놀이';
      case 7:
        return '간식 만들기';
      case 8:
        return '살미 수요 예배';
      default:
        return '알 수 없는 프로그램 번호입니다.';
    }
  };

  const handleImageClick = (index) => {
    navigate(`/detail?image=${index + 1}`);
  };

  return (
    <div className="component-container" style={{ textAlign: 'center' }}>
      <h2>플로잉 현황</h2>
      <HeartContainer>
        <HeartSvg viewBox="-6 0 140 118.4">
          <defs>
            <clipPath id="heartClip">
              <path
                d="M94.4,0c-13.6,0-24.4,10.8-30.4,17.2C58,10.8,47.2,0,33.6,0C14.8,0,0,14.8,0,33.6
              c0,22.8,30.8,43.6,64,72.4C97.2,77.2,128,56.4,128,33.6C128,14.8,113.2,0,94.4,0z"
              />
            </clipPath>
          </defs>
          <rect x="0" y={`${118.4 - filledHeight}`} width="128" height={filledHeight} fill="pink" clipPath="url(#heartClip)" />
          <path
            d="M94.4,0c-13.6,0-24.4,10.8-30.4,17.2C58,10.8,47.2,0,33.6,0C14.8,0,0,14.8,0,33.6
            c0,22.8,30.8,43.6,64,72.4C97.2,77.2,128,56.4,128,33.6C128,14.8,113.2,0,94.4,0z"
            fill="none"
            stroke="pink"
            strokeWidth="2"
          />
        </HeartSvg>
      </HeartContainer>
      <p>{`현재 금액: ${loveAmount.toLocaleString()} / ${targetAmount.toLocaleString()}`}</p>

      <FlowingListTitle>하나님의 사랑을 100% 전달하는 플로잉 ▼</FlowingListTitle>

      <FlowingList>
        {Array.from({ length: 8 }).map((_, index) => (
          <FlowingBox key={index}>
            <FlowingLabel>카이노스 X 방송팀 응원 지원</FlowingLabel>
            <FlowingBoxTop>
              <Image
                src={`${process.env.PUBLIC_URL}/pro${index + 1}.png`}
                alt={`Programm ${index + 1}`}
                className="image-item"
                onClick={() => handleImageClick(index)}
                style={{ cursor: 'pointer' }}
              />
              <FlowingDesc>{getImageContent(index + 1)}</FlowingDesc>
            </FlowingBoxTop>
            <FlowingBoxBottom>
              <FlowingTag>{getImageTitle(index + 1)}</FlowingTag>
            </FlowingBoxBottom>
          </FlowingBox>
        ))}
      </FlowingList>
    </div>
  );
};

const FlowingListTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8rem 0;
`;

const pump = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
`;

const HeartContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 auto;
  animation: ${pump} 2s infinite;
`;

const HeartSvg = styled.svg`
  width: 100%;
  height: 100%;
  text-align: center;
`;

const FlowingList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.8rem;
`;

const FlowingBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 0.1rem solid rgb(222, 226, 230);
  border-radius: 0.8rem;
  overflow: hidden;
`;

const FlowingLabel = styled.div`
  position: absolute;
  top: 1.6rem;
  right: 1.2rem;
  padding: 0.8rem 1.2rem;
  background-color: #a5e5ff;
  border-radius: 1.6rem;
  color: #fff;
  font-weight: 700;
  font-size: 1.8rem;
`;

const Image = styled.img`
  width: 100%;
  max-width: 100%;
  height: auto;
`;

const FlowingBoxTop = styled.div`
  border-bottom: 1px solid #f5f5f5;
  text-align: start;
  height: 280px; // 원하는 높이로 설정
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FlowingDesc = styled.div`
  width: 100%;
  padding: 0.8rem;
  font-size: 1%.6;
  color: grey;
`;

const FlowingTag = styled.div`
  padding: 0.8rem;
  font-size: 1.4rem;
  color: black;
  text-align: left;
`;

const FlowingBoxBottom = styled.div`
  width: 100%;
  padding: 0.8rem;
  text-align: start;
`;
