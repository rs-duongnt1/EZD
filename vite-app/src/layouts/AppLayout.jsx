import styled from '@emotion/styled';
import { Outlet } from 'react-router';
import Header from '../components/Header';

const Container = styled.div({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 15px',
});

const Main = styled.div({
  marginTop: '30px',
  marginBottom: '60px',
});

export default function AppLayout() {
  return (
    <div>
      <Header />
      <Container>
        <Main>
          <Outlet />
        </Main>
      </Container>
    </div>
  );
}
