import styled from "@emotion/styled";
import { Outlet } from "react-router";
import Header from "../components/Header";

const Main = styled.div({
  marginTop: "30px",
  marginBottom: "60px",
});

export default function AppLayout() {
  return (
    <div>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
}
