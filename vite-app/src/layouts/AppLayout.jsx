import styled from '@emotion/styled';
import { Outlet } from 'react-router';
import Header from '../components/Header';

const Container = styled.div({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 15px',
});

export default function AppLayout() {
  return (
    <div>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}
