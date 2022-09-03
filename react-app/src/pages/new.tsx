import {
  Stack,
  Typography,
  Grid,
  Avatar,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import axiosRequest from '@/plugins/axios-request';
import { history } from 'umi';
import { useEffect } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import TimeAgo from 'react-timeago';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { getFrameworkLogo } from '@/helpers/getFrameworkLogo';

enum DeploymentStatus {
  CREATING_GIT_REPO = 'CREATING_GIT_REPO',
  BUILDING = 'BUILDING',
  READY = 'READY',
  COMPLETED = 'COMPLETED',
}

export default function New() {
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

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getFieldState,
    setError,

    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      framework: 'react',
      name: '',
      org: 'rs-duongnt1',
    },
  });

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
        setProject(result);
        // history.push('/dashboard');
        axiosRequest.post('deployments', {
          project_id: result._id,
        });
      })
      .catch((err) => {
        setIsLoading(false);
        setError('name', { type: 'checkExists', message: err });
      });
  };

  return (
    <Stack spacing={5}>
      <Card variant="outlined">
        <CardContent>
          <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <Typography variant="h5" mb={1}>
                Create Project
              </Typography>
              <Divider
                sx={{
                  mb: 3,
                }}
              />
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
                placeholder="Repository Name"
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
          {project && (
            <DeployInspection project={project} timeStart={new Date()} />
          )}
        </CardContent>
      </Card>
    </Stack>
  );
}

const DeployInspection = ({
  project,
  timeStart,
}: {
  project: any;
  timeStart: any;
}) => {
  const deploySteps = [
    {
      label: 'Create Git Repository',
      activeWhen: DeploymentStatus.CREATING_GIT_REPO,
    },
    {
      label: 'Building',
      activeWhen: DeploymentStatus.BUILDING,
    },
    {
      label: 'Assign Domain',
      activeWhen: DeploymentStatus.READY,
    },
    {
      label: 'Completed',
      activeWhen: DeploymentStatus.COMPLETED,
    },
  ];

  const [currentStepStatus, setCurrentStepStatus] = useState(
    DeploymentStatus.CREATING_GIT_REPO,
  );

  useEffect(() => {
    const checkInterval = setInterval(() => {
      axiosRequest.get(`deployments/${project._id}`).then((result: any) => {
        setCurrentStepStatus(result.status);

        if (result.status === DeploymentStatus.READY) {
          clearInterval(checkInterval);
          setCurrentStepStatus(DeploymentStatus.COMPLETED);
        }
      });
    }, 2000);
  }, []);

  const displayIconCompleted = (index: number) => {
    return (
      deploySteps
        .map((deployStep) => deployStep.activeWhen)
        .indexOf(currentStepStatus) > index ||
      currentStepStatus === DeploymentStatus.COMPLETED
    );
  };

  const displayLoading = (deployStep: any) => {
    return (
      currentStepStatus === deployStep.activeWhen &&
      currentStepStatus !== DeploymentStatus.COMPLETED
    );
  };

  return (
    <Stack spacing={2}>
      <Stack>
        {currentStepStatus !== DeploymentStatus.COMPLETED && (
          <Stack direction="row" alignItems="center" spacing={2}>
            <CircularProgress size={20} />
            <Typography>
              Deployment started <TimeAgo date={timeStart} />
            </Typography>
          </Stack>
        )}
        {currentStepStatus === DeploymentStatus.COMPLETED && (
          <Stack direction="row" spacing={1} alignItems="center">
            <TaskAltIcon color="success" />
            <Typography color="success.main">Deployed successfully</Typography>
          </Stack>
        )}
      </Stack>
      <Card variant="outlined">
        {deploySteps.map((deployStep, index) => (
          <Stack key={deployStep.activeWhen}>
            <Stack
              px={2}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                height: '64px',
                cursor: 'pointer',
                ':hover': {
                  color: '#1890ff',
                },
              }}
            >
              <Stack direction="row" alignItems="center">
                <ArrowRightIcon />
                <span>{deployStep.label}</span>
              </Stack>
              {displayIconCompleted(index) && <TaskAltIcon color="success" />}
              {displayLoading(deployStep) && <CircularProgress size={20} />}
            </Stack>
            <Divider />
          </Stack>
        ))}
      </Card>
    </Stack>
  );
};
