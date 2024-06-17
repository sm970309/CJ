// src/Kakao.js

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "./firebase";
import { doc, updateDoc } from "firebase/firestore";
import "./Kakao.css"; // CSS 파일을 임포트합니다.

const Kakao = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const project = queryParams.get("project");
  const newAmount = parseInt(queryParams.get("amount"), 10);

  const handleConfirmClick = async () => {
    setLoading(true);
    if (!isNaN(newAmount) && newAmount > 0) {
      const projectRef = doc(db, "projects", "projectData");
      await updateDoc(projectRef, {
        [project]: newAmount,
      });
    }
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 2000); // 2초 동안 로딩창 표시
  };

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div className={loading ? "loading-overlay" : ""}>
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <h2>플로잉 방법</h2>
          <p>계좌번호: 어쩌구 저쩌구 </p>

          <div>
            <img
              src={`${process.env.PUBLIC_URL}/btn_send_small.png`}
              alt="Kakao Pay Button"
              style={{ cursor: "pointer", marginTop: "20px" }}
              onClick={() =>
                window.open("https://link.kakaopay.com/_/LvYlF0Z", "_blank")
              }
            />
          </div>
          <p>송금을 완료한 후 확인 버튼을 꼭 눌러주세요!</p>
          <button onClick={handleConfirmClick}>확인</button>
        </>
      )}
    </div>
  );
};

export default Kakao;
