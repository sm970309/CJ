import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const Result = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/flowing"); // 3초 후에 '/flowing' 페이지로 이동
    }, 5000);

    // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: "center" }}>
      <Image src={`${process.env.PUBLIC_URL}/result.png`} alt="result" />
    </div>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 100%;
  height: auto;
  object-fit: cover;
  animation: ${fadeIn} 2s ease-in-out;
`;

export default Result;
