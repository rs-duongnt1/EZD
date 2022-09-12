import { useEffect } from 'react';
import { connect, getDvaApp, useParams } from 'umi';
import { Stack, Typography } from '@mui/material';
function mapStateToProps(state: any) {
  return {
    project: state.app.currentProject,
  };
}

export default connect(mapStateToProps)(function Project({ project }: any) {
  return (
    <Stack>
      {project && (
        <Stack>
          <Typography variant="h5">{project.name}</Typography>
        </Stack>
      )}
    </Stack>
  );
});
