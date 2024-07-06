// src/Support.js

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../module/firebase";
import { doc, getDoc } from "firebase/firestore";
import styled, { keyframes } from "styled-components";

const Support = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const project = queryParams.get("project");
  const [currentAmount, setCurrentAmount] = useState(0);
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectRef = doc(db, "projects", "projectData");
        const docSnap = await getDoc(projectRef);

        if (docSnap.exists()) {
          setCurrentAmount(docSnap.data()["Love"]);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, ["Love"]);

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/,/g, ""); // 콤마 제거
    if (!isNaN(value) && value !== "") {
      setAmount(Number(value).toLocaleString());
    } else {
      setAmount("");
    }
  };

  const handleConfirmClick = () => {
    const numericAmount = parseInt(amount.replace(/,/g, ""), 10);
    if (!isNaN(numericAmount) && numericAmount > 0) {
      const newAmount = currentAmount + numericAmount;
      navigate(`/check?newAmount=${newAmount}&amount=${numericAmount}`);
    } else {
      alert("정확한 값을 입력해주세요.");
    }
  };

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };
  return (
    <>
      <Container>
        <Title>{project} 사랑 보내기</Title>
        <AmountText>현재 금액: {currentAmount.toLocaleString()}</AmountText>
        <StyledInput
          type="text"
          value={amount}
          onChange={handleInputChange}
          placeholder="금액 입력"
        />
        <ButtonBoxContainer>
          <StyledButton onClick={handleBackClick}>뒤로가기</StyledButton>
          <StyledButton onClick={handleConfirmClick}>플로잉</StyledButton>
        </ButtonBoxContainer>
      </Container>
    </>
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
  margin-bottom: 20px;
`;

const AmountText = styled.p`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const StyledInput = styled.input`
  padding: 10px;
  font-size: 1.2rem;
  border: 2px solid hotpink;
  border-radius: 5px;
  margin-bottom: 20px;
  width: calc(100% - 24px);
  max-width: 200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: deeppink;
  }

  &::placeholder {
    color: #ccc;
  }
`;

const ButtonBoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;

const StyledButton = styled.button`
  font-family: "MaplestoryBold", "sans-serif";
  font-size: 16px;
  cursor: pointer;
  padding: 10px 20px;
  margin-right: 10px;
  border: 2px solid hotpink;
  background-color: white;
  color: hotpink;
  border-radius: 5px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:last-child {
    margin-right: 0;
    background-color: hotpink;
    color: white;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

export default Support;
