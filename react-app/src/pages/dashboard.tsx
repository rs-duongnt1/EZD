import { useState } from 'react';
import { Link, history } from 'umi';
import {
  Card,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Typography,
  Stack,
  Button,
  Link as MuiLink,
  Avatar,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useEffect } from 'react';
import axiosRequest from '@/plugins/axios-request';
import { getFrameworkLogo } from '@/helpers/getFrameworkLogo';

export default function Dashboard() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    axiosRequest.get('projects').then((res: any) => {
      setProjects(res);
    });
  }, []);

  return (
    <Container>
      <Stack spacing={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>Projects</Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button variant="contained" onClick={() => history.push('/new')}>
              New Project
            </Button>
            <Button variant="contained" onClick={() => history.push('/new')}>
              New Team
            </Button>
          </Stack>
        </Stack>
        <Stack spacing={2}>
          {projects.map((project) => (
            <Card variant="outlined" key={project._id}>
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack>
                    <Typography color="red">
                      <Link
                        to={`/rs-duongnt1/${project.name}`}
                        className="title-link"
                      >
                        {project.name}
                      </Link>
                    </Typography>
                    <Typography>
                      <MuiLink
                        href="https://google.com"
                        target="_blank"
                        underline="hover"
                      >
                        training-center-client.vercel.app
                      </MuiLink>
                    </Typography>
                  </Stack>
                  <Avatar
                    sx={{
                      width: '40px',
                      height: '40px',
                    }}
                    variant="rounded"
                    src={getFrameworkLogo(project.framework)}
                  />
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
