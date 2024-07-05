// src/components/Main.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Main = () => {
  const navigate = useNavigate();

  const handleSupportClick = () => {
    navigate('/flowing');
  };

  return (
    <Wrapper>
      <GoToFlowing onClick={handleSupportClick}>플로잉 하기</GoToFlowing>
    </Wrapper>
  );
};

export default Main;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-image: url('${process.env.PUBLIC_URL}/landing.png');
  background-size: cover;
  background-position: center;
`;

const GoToFlowing = styled.button`
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3.2rem;
  font-weight: 700;
  background-color: transparent;
  color: #fff;
  border: 0.2rem solid #fff;
  padding: 0.8rem 1.6rem;
  cursor: pointer;
  border-radius: 0.8rem;

  &:hover,
  :active {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;
