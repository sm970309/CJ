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
  max-width: 50rem;
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
  @font-face {
    font-family: 'LINESeedKR-Bd';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/LINESeedKR-Bd.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
  }

  body {
    font-family: 'LINESeedKR-Bd', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  * {
    font-family: 'LINESeedKR-Bd', sans-serif;
  }
`;
