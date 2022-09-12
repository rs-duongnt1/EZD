import { useEffect } from 'react';
import { connect, getDvaApp, useParams } from 'umi';
function mapStateToProps(state: any) {
  return {
    project: state.app.currentProject,
  };
}

export default connect(mapStateToProps)(function Project({ project }: any) {
  return <div>{project && <div>{project.name}</div>}</div>;
});
