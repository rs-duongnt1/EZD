import { history } from 'umi';
import { Container, ThemeProvider, Divider } from '@mui/material';
import { Stack } from '@mui/system';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import theme from '@/theme';
import { useState } from 'react';
import '../styles/global.less';

export default function Layout({ children }) {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const handleTabChange = (tab, value) => {
    setCurrentTab(value);
    history.push('/' + value);
  };
  return (
    <ThemeProvider theme={theme}>
      <Stack>
        <Stack
          className="header"
          sx={{
            height: '64px',
            backgroundColor: '#fff',
          }}
        ></Stack>
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
              <Tab label="Dashboard" value="dashboard" />
              <Tab label="Intergrations" value="intergrations" />
              <Tab label="Activity" value="activity" />
              <Tab label="Domains" value="domains" />
              <Tab label="Usage" value="usage" />
              <Tab label="Settings" value="settings" />
            </Tabs>
          </Container>
        </Stack>
        <Stack mb={4}>
          <Divider />
        </Stack>
        <Container>{children}</Container>
      </Stack>
    </ThemeProvider>
  );
}
