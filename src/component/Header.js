import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <Wrapper onClick={handleClick}>
      <img
        src={`${process.env.PUBLIC_URL}/main.jpg`}
        alt="Example"
        style={{ "max-width": "60rem" }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
`;
