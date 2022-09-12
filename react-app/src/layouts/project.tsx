import { connect, history, Outlet, useParams, useMatch } from 'umi';
import { Container, Divider } from '@mui/material';
import { Stack } from '@mui/system';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';

import { useEffect } from 'react';
import '@/styles/global.less';

function mapStateToProps(state: any) {
  return {
    teams: state.app.teams,
    currentTeam: state.app.currentTeam,
  };
}

export default connect(mapStateToProps)(function ProjectDetailLayout({
  dispatch,
  currentTeam,
}: any) {
  const params: any = useParams();
  let _currentTab = '';
  const isMatchSource = useMatch('/:team/:project/sources');
  const isMatchDashboard = useMatch('/:team/:project');
  // const isMatchSettings = useMatch('/:team/:project/sources');
  const isMatchDeployments = useMatch('/:team/:project/deployments');
  if (isMatchDashboard) {
    _currentTab = '';
  } else if (isMatchDeployments) {
    _currentTab = 'deployments';
  } else if (isMatchSource) {
    _currentTab = 'sources';
  } else {
    _currentTab = 'settings';
  }

  const [currentTab, setCurrentTab] = useState(_currentTab);

  const handleTabChange = (tab, value) => {
    setCurrentTab(value);
    history.push(`/${currentTeam.slug}/${params.project}/${value}`);
  };

  useEffect(() => {
    if (currentTeam) {
      dispatch({
        type: 'app/setProjectDetail',
        payload: {
          teamId: currentTeam._id,
          slug: params.project,
        },
      });
    }
  }, []);

  return (
    <Stack>
      <Stack
        className="menu"
        sx={{
          backgroundColor: '#fff',
          position: 'fixed',
          width: '100%',
          zIndex: 999
        }}
      >
        <Container>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            <Tab label="Dashboard" value="" />
            <Tab label="Deployments" value="deployments" />
            {/* <Tab label="Sources" value="sources" /> */}
            <Tab label="Settings" value="settings" />
          </Tabs>
        </Container>
      </Stack>
      <Stack mb={4}>
        <Divider />
      </Stack>
      <Container
        sx={{
          mt: '48px',
        }}
      >
        <Outlet></Outlet>
      </Container>
    </Stack>
  );
});
