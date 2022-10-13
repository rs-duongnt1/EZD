// import Tabs, { Tab, TabList as ATabList, TabPanel } from "@atlaskit/tabs";
import styled from "@emotion/styled";
import Breadcrumbs, { BreadcrumbsItem } from "@atlaskit/breadcrumbs";
import { TabItem, Tabs } from "../../components/Tabs";
import Container from "../../components/Container";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const RepositoryRoot = styled.div({
  marginTop: "30px",
});

const HeaderTab = styled.div({
  marginTop: "10px",
});

const Content = styled.div({
  marginTop: "20px",
});

export default function Repository() {
  const params = useParams();
  const navigate = useNavigate();
  const tab = location.pathname.replace(`/${params.org}/${params.repo}/`, "");
  const [tabSelected, setTabSelected] = useState(tab);

  const handleChangeTab = (tab) => {
    setTabSelected(tab);
    navigate(tab);
  };

  useEffect(() => {
  }, []);


  return (
    <RepositoryRoot>
      <Container>
        <Breadcrumbs>
          <BreadcrumbsItem text="Duong" key="Duong" />
          <BreadcrumbsItem text="EZD" key="EZD" />
        </Breadcrumbs>
      </Container>
      <HeaderTab>
        <Tabs value={tabSelected} onChange={handleChangeTab}>
          <TabItem value="overview">Overview</TabItem>
          <TabItem value="deployments">Deployments</TabItem>
          <TabItem value="sources">Sources</TabItem>
        </Tabs>
      </HeaderTab>

      <Container>
        <Outlet></Outlet>
        {/* {repository && tabSelected === "overview" && (
          <Overview repository={repository} />
        )}
        {contents && tabSelected === "sources" && (
          <Sources contents={contents} onSelect={onSelectSource} />
        )} */}
      </Container>
    </RepositoryRoot>
  );
}
