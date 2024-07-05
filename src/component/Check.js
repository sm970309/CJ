import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { db } from '../module/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import '../check.css'; // CSS 파일을 임포트합니다.

const Check = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const newAmount = parseInt(queryParams.get('newAmount'), 10);
  const amount = parseInt(queryParams.get('amount'), 10);

  const handleConfirmClick = async () => {
    setLoading(true);
    if (!isNaN(newAmount) && newAmount > 0) {
      const projectRef = doc(db, 'projects', 'projectData');
      await updateDoc(projectRef, {
        ['Love']: newAmount,
      });
    }
    setTimeout(() => {
      setLoading(false);
      navigate('/flowing');
    }, 2000); // 2초 동안 로딩창 표시
  };

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div style={{ textAlign: 'center' }} className={loading ? 'loading-overlay' : ''}>
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <h2>플로잉 방법</h2>
          <p>계좌번호: 어쩌구 저쩌구 </p>
          <p>플로잉 금액: {amount.toLocaleString()}원</p>
          <p>송금을 완료한 후 확인 버튼을 꼭 눌러주세요!</p>
          <button
            onClick={handleBackClick}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            뒤로가기
          </button>
          <button
            onClick={handleConfirmClick}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            확인
          </button>
        </>
      )}
    </div>
  );
};

export default Check;
