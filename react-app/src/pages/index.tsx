import { connect, Link } from 'umi';
import { Button, Card, CardContent, Container, Stack } from '@mui/material';

function mapStateToProps(state: any) {
  return {
    teams: state.app.teams,
  };
}

export default connect(mapStateToProps)(function Home({ teams }: any) {
  return (
    <Container>
      <Stack spacing={2}>
        {teams.map((team: any) => (
          <Card variant="outlined" key={team._id}>
            <CardContent>
              <Stack>
                <Link to={team.slug}>{team.name}</Link>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
});
