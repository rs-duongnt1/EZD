import { connect, history, Outlet, useParams } from 'umi';
import {
  Container,
  ThemeProvider,
  Divider,
  Typography,
  Avatar,
} from '@mui/material';
import { Stack } from '@mui/system';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import theme from '@/theme';
import { useState } from 'react';

import { useEffect } from 'react';
import TeamList from '@/components/poppers/TeamList';
import '@/styles/global.less';

function mapStateToProps(state: any) {
  return {
    teams: state.app.teams,
    currentTeam: state.app.currentTeam,
    headerTabs: state.app.headerTabs,
  };
}

export default connect(mapStateToProps)(function ProjectDetailLayout({
  dispatch,
  teams,
  currentTeam,
}: any) {
  const params: any = useParams();

  const [currentTab, setCurrentTab] = useState('');

  const handleTabChange = (tab, value) => {
    setCurrentTab(value);
    history.push(`/${currentTeam.slug}/${value}`);
  };

  return (
    <Stack>
      <Stack
        className="menu"
        sx={{
          backgroundColor: '#fff',
        }}
      >
        <Container>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            <Tab label="Dashboard" value="" />
            <Tab label="Settings" value="settings" />
          </Tabs>
        </Container>
      </Stack>
      <Stack mb={4}>
        <Divider />
      </Stack>
      <Container>
        <Outlet></Outlet>
      </Container>
    </Stack>
  );
});
