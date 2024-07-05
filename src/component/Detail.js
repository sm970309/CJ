import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Detail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const imageNumber = queryParams.get("image");

  const getImageTitle = (imageNumber) => {
    switch (parseInt(imageNumber)) {
      case 1:
        return "아이스브레이킹";
      case 2:
        return "찬양 율동";
      case 3:
        return "레크레이션";
      case 4:
        return "실내 부스활동";
      case 5:
        return "실외 부스활동";
      case 6:
        return "연극";
      case 7:
        return "3일차 예배";
      case 8:
        return "물놀이";
      case 9:
        return "간식 만들기";
      case 10:
        return "살미 수요 예배";
      default:
        return "알 수 없는 프로그램 번호입니다.";
    }
  };

  const getImageContent = (imageNumber) => {
    switch (parseInt(imageNumber)) {
      case 1:
        return '"하나님은 000을 사랑해" 큰 종이와 부채로 서로를 소개하고 알아가요.';
      case 2:
        return '"목소리로! 표정으로! 온몸으로!" 신나게 찬양해요.';
      case 3:
        return '"5살부터 13살까지! 우리는 한 팀!" 하나님 안에서 공동체를 세워가요.';
      case 4:
        return '"우리 서로 사랑해" 하나님이 주신 마음을 클레이 소프로 표현해요';
      case 5:
        return '"미움 다툼 시기 질투 버리고" 우비에 물감으로 우리의 죄를 적고, 물총으로 우리의 죄를 지워요';
      case 6:
        return '"하나님이 나를 엄청 사랑하신대" 선생님들이 직접 연기하고 춤추고 노래하는 연극을 관람해요.';
      case 7:
        return '"사랑으로의 초대" 삼삼오오 모여서 복음을 나눠요.';
      case 8:
        return '"와 여름이다!!" 더운 여름 계곡에서 신나게 물놀이를 해요.';
      case 9:
        return "완벽한 레시피는 없어! 뭘 넣어도 화채는 맛있지!";
      case 10:
        return '"아름다운 마음들이 모여서" 살미 순복음 교회의 수요예배를 함께 드려요.';
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
      <h2>{getImageTitle(imageNumber)}</h2>
      <p style={{ color: "gray" }}>{getImageContent(imageNumber)}</p>
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
