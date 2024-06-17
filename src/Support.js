// src/Support.js

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

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
          setCurrentAmount(docSnap.data()[project]);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [project]);

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
      navigate(`/kakao?project=${project}&amount=${newAmount}`);
    } else {
      alert("정확한 값을 입력해주세요.");
    }
  };

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };
  return (
    <div>
      <h2>{project} 플로잉</h2>

      <p>현재 금액: {currentAmount.toLocaleString()}</p>
      <input
        type="text"
        value={amount}
        onChange={handleInputChange}
        placeholder="금액 입력"
      />
      <div className="button-container" style={{ marginTop: "10px" }}>
        <button onClick={handleBackClick} style={{ marginRight: "10px" }}>
          뒤로가기
        </button>
        <button onClick={handleConfirmClick}>확인</button>
      </div>
    </div>
  );
};

export default Support;
