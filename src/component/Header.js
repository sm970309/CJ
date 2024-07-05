import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <Wrapper onClick={handleClick}>
      <Banner src={`${process.env.PUBLIC_URL}/header.jpg`} alt="Example" />
    </Wrapper>
  );
};

const Wrapper = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Banner = styled.img`
  width: 100%;
  height: auto;
  cursor: pointer;
`;
