// src/components/Main.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();

  const handleSupportClick = () => {
    navigate('/ChartComponent');
  };

  return (
    <div style={{ width: '100%', margin: '0 auto', textAlign: 'center' }}>
      <h1>갑니다 단기선교...어쩌구 저쩌구...</h1>
      <h2>여기엔 적당한 이미지...</h2>
      <button
        onClick={handleSupportClick}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          marginTop: '20px',
        }}
      >
        가보자고
      </button>
    </div>
  );
};

export default Main;
