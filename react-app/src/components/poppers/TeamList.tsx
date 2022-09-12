import {
  ClickAwayListener,
  Fade,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Paper,
  Popper,
} from '@mui/material';
import { useState } from 'react';
import { connect, history } from 'umi';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

function mapStateToProps(state: any) {
  return {
    teams: state.app.teams,
    currentTeam: state.app.currentTeam,
  };
}
export default connect(mapStateToProps)(function TeamList({
  teams,
  dispatch,
}: any) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const clickAwayHandler = () => {
    if (open) {
      setOpen(false);
    }
  };
  const showPopup = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const switchCurrentTeam = (team: any) => {
    dispatch({
      type: 'app/setCurrentTeam',
      payload: team,
    });
    dispatch({
      type: 'app/setProjectsAsync',
      payload: {
        teamId: team._id,
      },
    });
    setOpen(false);
    history.replace(`/${team.slug}`);
  };
  return (
    <div>
      <IconButton onClick={showPopup}>
        <UnfoldMoreIcon />
      </IconButton>
      {open && (
        <ClickAwayListener onClickAway={clickAwayHandler}>
          <Popper
            open={open}
            transition
            placement="bottom-end"
            anchorEl={anchorEl}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <List
                    sx={{
                      width: '100%',
                      maxWidth: 360,
                      bgcolor: 'background.paper',
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                      <ListSubheader component="div" id="nested-list-subheader">
                        Teams
                      </ListSubheader>
                    }
                  >
                    {teams.map((team) => (
                      <ListItemButton
                        key={team._id}
                        onClick={() => switchCurrentTeam(team)}
                      >
                        <ListItemText primary={team.name} />
                      </ListItemButton>
                    ))}
                  </List>
                </Paper>
              </Fade>
            )}
          </Popper>
        </ClickAwayListener>
      )}
    </div>
  );
});
