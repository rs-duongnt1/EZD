import {
  Stack,
  Typography,
  Grid,
  Avatar,
  TextField,
  Card,
  CardContent,
  Divider,
  Alert,
  Select,
  MenuItem,
  Container,
  LinearProgress,
} from '@mui/material';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import axiosRequest from '@/plugins/axios-request';
import { connect, history } from 'umi';
import { useEffect } from 'react';
import { getFrameworkLogo } from '@/helpers/getFrameworkLogo';
import DeployInspection from '@/components/DeployInspection';

function mapStateToProps(state: any) {
  return {
    currentTeam: state.app.currentTeam,
    teams: state.app.teams,
  };
}

export default connect(mapStateToProps)(function New({
  currentTeam,
  teams,
}: any) {
  const [templates, setTemplates] = useState([
    {
      value: 'react',
      title: 'Create React App',
      desc: 'A client-side React app created with create-react-app.',
      img: getFrameworkLogo('react'),
    },
    {
      value: 'vue',
      title: 'Vue.js',
      desc: 'A Vue.js app, created with the Vue CLI.',
      img: getFrameworkLogo('vue'),
    },
    {
      value: 'angular',
      title: 'Angular',
      desc: 'An Angular app, created with the Angular CLI.',
      img: getFrameworkLogo('angular'),
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [project, setProject] = useState<any>();
  const [deployment, setDeployment] = useState<any>();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    setError,
    watch,

    formState: { errors },
  } = useForm({
    defaultValues: {
      framework: 'react',
      name: '',
      slug: '',
      teamId: currentTeam?._id,
    },
  });

  const name = watch('name');

  useEffect(() => {
    setValue('slug', name.replace(/ /g, '-'));
  }, [name]);

  const currentTemplate = useWatch({
    control,
    name: 'framework',
  });

  const onSubmit = (data: any) => {
    setIsLoading(true);
    axiosRequest
      .post('projects', data)
      .then((result: any) => {
        setIsLoading(false);

        if (result) {
          const { project } = result;
          setProject(project);
          // history.push('/dashboard');
          axiosRequest
            .post('deployments', {
              projectId: project._id,
            })
            .then((result: any) => {
              const { deployment } = result;
              setDeployment(deployment);
            });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setError('name', { type: 'checkExists', message: err });
      });
  };

  if (!currentTeam) {
    return <LinearProgress></LinearProgress>;
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Stack spacing={5}>
        <Card variant="outlined">
          <CardContent>
            <Stack
              spacing={2}
              component="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Stack>
                <Typography variant="h5" mb={1}>
                  Create Project
                </Typography>
                <Divider
                  sx={{
                    mb: 3,
                  }}
                />
                {teams.length > 0 && (
                  <Stack mb={2}>
                    <Typography>Select team</Typography>
                    <Select
                      {...register('teamId')}
                      defaultValue={currentTeam._id}
                      variant="standard"
                    >
                      {teams.map((team: any) => (
                        <MenuItem value={team._id} key={team._id}>
                          {team.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                )}
                <Typography mb={2}>Select a template</Typography>
                <Grid container spacing={2}>
                  {templates.map((template) => (
                    <Grid item xs={6} md={4} key={template.title}>
                      <Card
                        onClick={() => {
                          setValue('framework', template.value);
                        }}
                        variant="outlined"
                        sx={{
                          cursor: 'pointer',
                          ...(template.value === currentTemplate && {
                            borderColor: '#1890ff',
                          }),
                          ':hover': {
                            boxShadow: '0 5px 10px rgba(0,0,0,.12)',
                          },
                        }}
                      >
                        <CardContent>
                          <Stack spacing={1}>
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                            >
                              <Avatar
                                variant="rounded"
                                src={template.img}
                                sx={{
                                  width: '20px',
                                  height: '20px',
                                }}
                              />
                              <Typography variant="subtitle1">
                                {template.title}
                              </Typography>
                            </Stack>
                            <Typography variant="caption" color="#666666">
                              {template.desc}
                            </Typography>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Stack>
              <Stack>
                <Typography mb={2}>Project Name</Typography>
                <TextField
                  disabled={!!project || isLoading}
                  {...register('name', { required: true })}
                  variant="standard"
                  placeholder="Project Name"
                  size="small"
                />
                {errors.name?.type === 'required' && (
                  <Typography color="error" mt={1} variant="subtitle2">
                    This field is required
                  </Typography>
                )}
                {errors.name?.type === 'checkExists' && (
                  <Typography color="error" mt={1} variant="subtitle2">
                    {errors.name?.message}
                  </Typography>
                )}
              </Stack>
              <Stack>
                <Typography mb={2} color="rgba(0, 0, 0, 0.38)">
                  Project Slug
                </Typography>
                <TextField
                  disabled
                  placeholder="Project Slug"
                  {...register('slug', { required: true })}
                  variant="standard"
                  size="small"
                />
              </Stack>
              <Stack direction="row">
                <LoadingButton
                  type="submit"
                  variant="contained"
                  // loadingIndicator="Creating…"
                  loadingPosition="start"
                  disabled={!!project}
                  loading={isLoading}
                  startIcon={<SaveIcon />}
                >
                  Create
                </LoadingButton>
              </Stack>
              {project && (
                <Alert severity="success">Create project successfully!</Alert>
              )}
            </Stack>
          </CardContent>
        </Card>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" mb={1}>
              Deploy
            </Typography>
            <Divider
              sx={{
                mb: 3,
              }}
            />
            {project && deployment && (
              <DeployInspection
                project={project}
                deployment={deployment}
                timeStart={new Date()}
              />
            )}
            {(!project || !deployment) && (
              <Typography color="rgba(0, 0, 0, 0.38)">
                Not started yet
              </Typography>
            )}
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
});
