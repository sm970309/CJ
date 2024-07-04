import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Detail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const imageNumber = queryParams.get("image");

  const getImageContent = (imageNumber) => {
    switch (imageNumber) {
      case "1":
        return "프로그램 1에 대한 내용";
      case "2":
        return "프로그램 2에 대한 내용";
      case "3":
        return "프로그램 3에 대한 내용";
      case "4":
        return "프로그램 4에 대한 내용";
      case "5":
        return "프로그램 5에 대한 내용";
      case "6":
        return "프로그램 6에 대한 내용";
      case "7":
        return "프로그램 7에 대한 내용";
      case "8":
        return "프로그램 8에 대한 내용";
      default:
        return "알 수 없는 프로그램 번호입니다.";
    }
  };

  const handleSupportClick = () => {
    navigate(`/support?image=${imageNumber}`);
  };
  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>프로그램 {imageNumber} 상세 정보</h2>
      <p>{getImageContent(imageNumber)}</p>
      <button
        onClick={handleBackClick}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        뒤로가기
      </button>
      <button
        onClick={handleSupportClick}
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        플로잉
      </button>
    </div>
  );
};

export default Detail;
