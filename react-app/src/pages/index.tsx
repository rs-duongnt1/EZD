import { connect, Link, Navigate } from 'umi';
import {
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from '@mui/material';

function mapStateToProps(state: any) {
  return {
    teams: state.app.teams,
    currentTeam: state.app.currentTeam,
  };
}

export default connect(mapStateToProps)(function Home({
  teams,
  currentTeam,
}: any) {
  if (currentTeam) {
    return <Navigate to={currentTeam.slug} />;
  }
  return <div>Loading...</div>;
});
