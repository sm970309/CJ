import styled from 'styled-components';
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout = ({ children }) => (
  <Outer>
    <Inner>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Inner>
  </Outer>
);

const Outer = styled.div`
  width: 100%;
  background-color: #f5f5f5;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60rem;
  min-height: 100vh;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 1.6rem;
  background-color: #fff;
`;

const Main = styled.main`
  flex: 1;
  padding: 1.6rem 0;
`;
