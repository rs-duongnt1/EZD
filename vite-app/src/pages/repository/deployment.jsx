import { useGetListDeploymentsQuery } from '../../services/deployment';
import { useParams } from 'react-router-dom';
import Stack from '../../components/Stack';
import TimeAgo from 'react-timeago';
import { Typography } from '../../components/Typography';
import Spinner from '@atlaskit/spinner';

const Circle = ({ w, h, color }) => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      backgroundColor={color || '#000'}
      borderRadius="50%"
      width={w || 10}
      height={h || 10}
    ></Stack>
  );
};

export default function Deployment() {
  const { org, repo } = useParams();

  console.log(org, repo);
  const { data: deployments } = useGetListDeploymentsQuery({
    org,
    repo,
  });
  console.log(deployments);
  return (
    <Stack
      direction="column"
      border="1px solid #d6d6d6"
      borderRadius="10px"
      marginTop="30px"
    >
      {deployments?.length === 0 && (
        <Stack padding="10px 0" justifyContent="center" alignItems="center">
          <Typography>No deployments yet</Typography>
        </Stack>
      )}
      {deployments?.map((deployment, index) => (
        <Stack
          key={deployment.id}
          padding="20px 15px"
          alignItems="center"
          borderBottom={
            deployments.length - 1 !== index ? '1px solid #d6d6d6' : 'none'
          }
        >
          <Stack width="400px">
            {deployment.url && (
              <Typography
                variant="link"
                href={'//' + deployment.url}
                target="_blank"
              >
                {deployment.url}
              </Typography>
            )}
            {!deployment.url && <Typography>-</Typography>}
          </Stack>
          <Stack width="20%">
            {deployment.state === 'QUEUE' && (
              <Stack alignItems="center">
                <Circle color="#eaeaea"></Circle>
                <Typography marginLeft="5px">Queue</Typography>
              </Stack>
            )}
            {deployment.state === 'BUILDING' && (
              <Stack alignItems="center">
                <Circle color="#f5a623"></Circle>
                <Typography marginLeft="5px" marginRight="5px">
                  Building
                </Typography>
                <Spinner size="small" />
              </Stack>
            )}
            {deployment.state === 'READY' && (
              <Stack alignItems="center">
                <Circle color="#29bc9b"></Circle>
                <Typography marginLeft="5px">Ready</Typography>
              </Stack>
            )}
            {deployment.state === 'ERROR' && (
              <Stack alignItems="center">
                <Circle color="#ee0000"></Circle>
                <Typography marginLeft="5px">Error</Typography>
              </Stack>
            )}
          </Stack>
          <Stack width="300px" color="#57606a" direction="column">
            <Typography>{deployment.head_commit.message}</Typography>
            <Typography>{deployment.ref}</Typography>
          </Stack>
          <Stack flex={1} justifyContent="flex-end">
            <TimeAgo
              style={{ color: '#57606a' }}
              date={deployment.head_commit.timestamp}
            />
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}
