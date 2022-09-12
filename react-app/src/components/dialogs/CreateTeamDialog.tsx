import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import { connect, history } from 'umi';
import axiosRequest from '@/plugins/axios-request';
import { useForm } from 'react-hook-form';
import { Stack } from '@mui/system';
import { Divider, Typography } from '@mui/material';
import { useEffect } from 'react';

function mapStateToProps() {
  return {
    name: 'name',
  };
}

export default connect(mapStateToProps)(function CreateTeamDialog({
  open,
  onClose,
  dispatch,
}: any) {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      slug: '',
    },
  });

  const name = watch('name');

  useEffect(() => {
    setValue('slug', name.replace(/ /g, '-'));
  }, [name]);

  const handleCreateTeam = (data: any) => {
    axiosRequest
      .post('teams', data)
      .then((response: any) => {
        if (response) {
          const { team } = response;
          history.replace(team.slug);
          dispatch({
            type: 'app/setTeamsAsync',
            payload: {
              teamSlug: team.slug,
            },
          });
          dispatch({
            type: 'app/setProjectsAsync',
            payload: {
              teamId: team._id,
            },
          });
          onClose();
          setValue('name', '');
        }
      })
      .catch((err) => {
        setError('name', {
          type: 'exists',
          message: err,
        });
      });
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Create Team</DialogTitle>
      <DialogContent>
        <Stack component="form" onSubmit={handleSubmit(handleCreateTeam)}>
          <Divider />

          <Stack pt={2} pb={2} spacing={1}>
            <Stack>
              <Typography>Team Name</Typography>
              <TextField
                {...register('name')}
                size="small"
                variant="standard"
              />
            </Stack>
            {errors.name?.type === 'exists' && (
              <Stack>
                <Typography color="error.main">
                  {errors.name.message}
                </Typography>
              </Stack>
            )}
          </Stack>
          <Stack pb={5} spacing={1}>
            <Stack>
              <Typography color="rgba(0, 0, 0, 0.38)">Slug</Typography>
              <TextField
                disabled
                {...register('slug')}
                size="small"
                variant="standard"
              />
            </Stack>
            {errors.name?.type === 'exists' && (
              <Stack>
                <Typography color="error.main">
                  {errors.name.message}
                </Typography>
              </Stack>
            )}
          </Stack>

          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button onClick={onClose} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Create
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
});
