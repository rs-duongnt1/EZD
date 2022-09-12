import { connect, history, Outlet, useParams } from 'umi';
import {
  Container,
  ThemeProvider,
  Divider,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import { Stack } from '@mui/system';

import theme from '@/theme';

import { useEffect, useState } from 'react';
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLogin');
    history.push('/login');
  };

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
      <Stack minHeight="100vh" justifyContent="space-between">
        <Stack
          className="header"
          direction="row"
          alignItems="center"
          sx={{
            height: '64px',
            backgroundColor: '#fff',
            position: 'fixed',
            width: '100%',
            zIndex: 999,
          }}
        >
          <Container>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
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
              <Stack direction="row" alignItems="center">
                <IconButton onClick={handleClick}>
                  <Avatar sx={{ width: '30px', height: '30px' }} />
                </IconButton>
                <Typography>duongnt1@runsystem.net</Typography>
              </Stack>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Stack>
          </Container>
        </Stack>
        <Stack mt="64px">
          <Outlet></Outlet>
        </Stack>
        <Stack
          alignItems="center"
          sx={{
            backgroundColor: '#fff',
            padding: '36px 24px',
            borderTop: '1px solid #eaeaea',
            mt: '60px',
          }}
        >
          <Typography fontSize="12px">
            &copy; 2022 GMO RUNSYSTEM DN. All rights reserved.
          </Typography>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
});
