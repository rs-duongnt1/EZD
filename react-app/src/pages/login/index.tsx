import { history } from 'umi';
import '@/styles/global.less';
import theme from '@/theme';
import {
  Button,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';

export default function Login() {
  const login = () => {
    localStorage.setItem('isLogin', 'true');
    history.push('/');
  };
  return (
    <ThemeProvider theme={theme}>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          width: '100%',
          height: '100vh',
        }}
      >
        <Stack
          component="form"
          sx={{
            py: 3,
            px: 5,
            backgroundColor: '#fff',
            borderRadius: '10px',
            minWidth: '350px',
          }}
          spacing={3}
        >
          <Stack>
            <img
              src="https://runsystem.net/wp-content/uploads/image_gmo/logo.png"
              width="100%"
            />
          </Stack>
          <Stack>
            <Typography>Email</Typography>
            <TextField size="small" placeholder="Your email" />
          </Stack>
          <Stack>
            <Typography>Password</Typography>
            <TextField
              type="password"
              size="small"
              placeholder="Your password"
            />
          </Stack>
          <Stack>
            <Button variant="contained" onClick={login}>
              Login
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
