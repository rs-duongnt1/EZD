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

function mapStateToProps(state: any) {
  return {
    currentTeam: state.app.currentTeam,
    headerTabs: state.app.headerTabs,
  };
}

export default connect(mapStateToProps)(function ProjectDetailLayout({
  dispatch,
  currentTeam,
}: any) {
  const params: any = useParams();
  useEffect(() => {
    dispatch({
      type: 'app/setTeamsAsync',
      payload: {
        teamSlug: params.team,
      },
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Stack>
        <Stack
          className="header"
          direction="row"
          alignItems="center"
          sx={{
            height: '64px',
            backgroundColor: '#fff',
          }}
        >
          <Container>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                <Avatar
                  sx={{ width: 20, height: 20 }}
                  src="https://vercel.com/api/www/avatar/?u=rs-duongnt1&s=64"
                />
                <Typography
                  variant="h6"
                  component="span"
                  onClick={() => history.push(`/${currentTeam.slug}`)}
                >
                  {currentTeam?.name}
                </Typography>
              </Stack>
              <Stack>
                <TeamList />
              </Stack>
              <Stack>
                <Typography variant="subtitle2">{params.project}</Typography>
              </Stack>
            </Stack>
          </Container>
        </Stack>
        <Outlet></Outlet>
      </Stack>
    </ThemeProvider>
  );
});
