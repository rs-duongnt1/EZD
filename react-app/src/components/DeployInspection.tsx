import axiosRequest from '@/plugins/axios-request';
import {
  Card,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import TimeAgo from 'react-timeago';

enum DeploymentStatus {
  QUEUED = 'QUEUED',
  BUILDING = 'BUILDING',
  READY = 'READY',
  COMPLETED = 'COMPLETED',
}

const DeployInspection = ({
  project,
  deployment,
  timeStart,
}: {
  project: any;
  deployment: any;
  timeStart: any;
}) => {
  const deploySteps = [
    {
      label: 'Building',
      activeWhen: DeploymentStatus.BUILDING,
    },
    {
      label: 'Assign Domain',
      activeWhen: DeploymentStatus.READY,
    },
  ];

  const [currentStepStatus, setCurrentStepStatus] = useState(
    DeploymentStatus.QUEUED,
  );

  useEffect(() => {
    const checkInterval = setInterval(() => {
      axiosRequest.get(`deployments/${deployment._id}`).then((result: any) => {
        const { deployment } = result;
        setCurrentStepStatus(deployment.state);

        if (deployment.state === DeploymentStatus.READY) {
          clearInterval(checkInterval);
          setCurrentStepStatus(DeploymentStatus.COMPLETED);
        }
      });
    }, 2000);

    return () => {
      clearInterval(checkInterval);
    };
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

export default DeployInspection;
