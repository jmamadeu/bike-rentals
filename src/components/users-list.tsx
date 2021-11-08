import { Delete as DeleteIcon } from '@mui/icons-material';
import { Avatar, IconButton, Snackbar } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { v4 } from 'uuid';
import { useDeleteUser } from '../hooks/use-delete-user';
import { useUsers } from '../hooks/use-users';
import { stringAvatar } from '../utils/theme';

export function UsersList() {
  const { data } = useUsers();
  const { mutateAsync: deleteUserMutate, isSuccess } = useDeleteUser();

  const [snackbarOptions, setSnackbarOptions] = useState({
    isOpen: false,
    message: '',
  });

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUserMutate(id);

      setSnackbarOptions({ isOpen: true, message: 'User deleted' });
    } catch (err) {}
  };

  const handleCloseSnackbar = () =>
    setSnackbarOptions(old => ({ ...old, isOpen: false }));

  return (
    <>
      <Snackbar
        open={snackbarOptions.isOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        message={snackbarOptions.message}
      />
      <Typography variant="h5">Users</Typography>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {data?.map((user, index) => (
          <>
            {index > 0 && <Divider variant="inset" component="li" />}
            <ListItem
              alignItems="flex-start"
              key={v4()}
              secondaryAction={
                <IconButton
                  onClick={() => handleDeleteUser(user.id)}
                  edge="end"
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar {...stringAvatar(user?.name || '')} />
              </ListItemAvatar>
              <ListItemText
                primary={user.name}
                secondary={
                  <>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {user?.email}
                    </Typography>{' '}
                    <br />
                    <Typography variant="caption">{user?.role}</Typography>
                  </>
                }
              />
            </ListItem>
          </>
        ))}
      </List>
    </>
  );
}
