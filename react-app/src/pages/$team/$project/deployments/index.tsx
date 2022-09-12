import { Card, CardContent, Link, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { connect, getDvaApp, useParams, useMatch } from 'umi';
function mapStateToProps(state: any) {
  return {
    deployments: state.app.deployments,
    currentTeam: state.app.currentTeam,
    currentProject: state.app.currentProject,
  };
}

export default connect(mapStateToProps)(function Deployments({
  deployments,
  currentTeam,
  dispatch,
  currentProject,
}: any) {
  useEffect(() => {
    if (currentTeam && currentProject) {
      dispatch({
        type: 'app/setDeploymentsAsync',
        payload: {
          teamId: currentTeam._id,
          projectId: currentProject._id,
        },
      });
    }
  }, []);
  return (
    <Stack>
      <Stack>
        {deployments.map((deployment: any) => (
          <Card variant="outlined" key={deployment._id}>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>
                  <Link href={deployment.url} target="_blank">
                    {deployment.url}
                  </Link>
                </Typography>
                <Typography>{deployment.state}</Typography>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
});
