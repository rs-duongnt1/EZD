import { useState } from 'react';
import { Link, history, useParams, connect } from 'umi';
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
import { useEffect } from 'react';
import { getFrameworkLogo } from '@/helpers/getFrameworkLogo';
import CreateTeamDialog from '@/components/dialogs/CreateTeamDialog';

function mapStateToProps(state: any) {
  return {
    currentTeam: state.app.currentTeam,
    projects: state.app.projects,
  };
}

export default connect(mapStateToProps)(function Team({
  currentTeam,
  dispatch,
  projects,
}: any) {
  const [openCreateTeamDialog, setOpenCreateTeamDialog] = useState(false);
  useEffect(() => {
    if (currentTeam) {
      dispatch({
        type: 'app/setProjectsAsync',
        payload: {
          teamId: currentTeam._id,
        },
      });
    }
  }, []);

  return (
    <Stack>
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
            <Button
              variant="contained"
              onClick={() => {
                console.log('click me');
                setOpenCreateTeamDialog(true);
              }}
            >
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
                        to={`/${currentTeam.slug}/${project.slug}`}
                        className="title-link"
                      >
                        {currentTeam.name} / {project.name}
                      </Link>
                    </Typography>
                    <Typography>
                      <MuiLink
                        href={project?.deployment?.url}
                        target="_blank"
                        underline="hover"
                      >
                        {project?.deployment?.url}
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

      {/* dialogs */}
      <CreateTeamDialog
        open={openCreateTeamDialog}
        onClose={() => setOpenCreateTeamDialog(false)}
      />
    </Stack>
  );
});
