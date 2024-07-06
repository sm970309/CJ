import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const Detail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const imageNumber = queryParams.get('image');

  const handleSupportClick = () => {
    navigate(`/support?image=${imageNumber}`);
  };
  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };
  const handleOnLoad = (e) => {
    e.target.classList.remove('skelton');
  };
  return (
    <Wrapper>
      <Image
        src={`${process.env.PUBLIC_URL}/prodetail${imageNumber}.png`}
        alt={`Programm ${imageNumber}`}
        className="image-item skelton"
        onLoad={handleOnLoad}
      />
      <ButtonBoxContainer>
        <StyledButton onClick={handleBackClick}>뒤로가기</StyledButton>
        <StyledButton onClick={handleSupportClick}>플로잉</StyledButton>
      </ButtonBoxContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
  padding: 2rem 0;

  .skelton {
    animation: ${keyframes`
    0% {
      background-color: #f6f7f8;
    }
    50% {
      background-color: #edeef1;
    }
    100% {
      background-color: #f6f7f8;
    }
  `} 1s infinite;
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 100%;
  height: auto;
  min-height: 30rem;
  object-fit: cover;
  border-top-left-radius: 1.6rem;
  border-top-right-radius: 1.6rem;
`;

const ButtonBoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;

const StyledButton = styled.button`
  font-family: 'MaplestoryBold', 'sans-serif';
  font-size: 16px;
  cursor: pointer;
  padding: 10px 20px;
  margin-right: 10px;
  border: 2px solid #ff99cc;
  background-color: white;
  color: #ff99cc;
  border-radius: 5px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:last-child {
    margin-right: 0;
    background-color: #ff99cc;
    color: white;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

export default Detail;
