import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../module/firebase";
import { doc, updateDoc } from "firebase/firestore";
import "../check.css"; // CSS 파일을 임포트합니다.
import styled, { keyframes } from "styled-components";

const Check = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const newAmount = parseInt(queryParams.get("newAmount"), 10);
  const amount = parseInt(queryParams.get("amount"), 10);

  const handleConfirmClick = async () => {
    setLoading(true);
    if (!isNaN(newAmount) && newAmount > 0) {
      const projectRef = doc(db, "projects", "projectData");
      await updateDoc(projectRef, {
        ["Love"]: newAmount,
      });
    }
    setTimeout(() => {
      setLoading(false);
      navigate("/flowing");
    }, 2000); // 2초 동안 로딩창 표시
  };

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div
      style={{ textAlign: "center" }}
      className={loading ? "loading-overlay" : ""}
    >
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <Container>
            <div>
              <Title>플로잉 방법</Title>
              <Text>계좌번호: 3333307327865 카카오뱅크 (홍창기)</Text>
              <Text>플로잉 금액: {amount.toLocaleString()}원</Text>
            </div>
            <BottomSection>
              <Text>송금을 완료한 후 "확인 버튼"을 꼭 눌러주세요!</Text>
              <ButtonBoxContainer>
                <StyledButton onClick={handleBackClick}>뒤로가기</StyledButton>
                <StyledButton onClick={handleConfirmClick}>확인</StyledButton>
              </ButtonBoxContainer>
            </BottomSection>
          </Container>
        </>
      )}
    </div>
  );
};

const Container = styled.div`
  text-align: center;
  padding: 20px;
  font-family: "MaplestoryBold", "sans-serif";
`;

const Title = styled.h2`
  font-size: 3rem;
  color: hotpink;
  margin-bottom: 50px;
  font-family: "MaplestoryBold", "sans-serif";
`;

const Text = styled.p`
  font-size: 1.5rem;
  margin-bottom: 50px;
`;

const BottomSection = styled.div`
  text-align: center;
  width: 100%;
`;

const ButtonBoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.button`
  font-family: "MaplestoryBold", "sans-serif";
  font-size: 16px;
  cursor: pointer;
  padding: 10px 20px;
  margin-right: 10px;
  border: 2px solid #ff69b4;
  background-color: white;
  color: #ff69b4;
  border-radius: 5px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:last-child {
    margin-right: 0;
    background-color: #ff69b4;
    color: white;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

export default Check;
