import {
  Dialog,
  DialogContent,
  DialogTitle, Snackbar
} from '@mui/material';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { v4 } from 'uuid';
import { useDeleteUser } from '../hooks/use-delete-user';
import { useSaveUser } from '../hooks/use-save-user';
import { useUsers } from '../hooks/use-users';
import {
  CreateUserWithCredentialsProperties,
  UserProperties
} from '../models/user-model';
import { SaveUserForm } from './save-user-form';
import { UserListItem } from './user-list-item';

export function UsersList() {
  const { data } = useUsers();
  const { mutateAsync: deleteUserMutate } = useDeleteUser();
  const { mutateAsync: saveUserMutate, isLoading } = useSaveUser();

  const [isModalUserOpen, setIsModalUserOpen] = useState(false);
  const [userSelected, setUserSelected] = useState({} as UserProperties);
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

  const handleUpdateUser = async (user: UserProperties) => {
    setUserSelected(user);

    setIsModalUserOpen(true);
  };

  const toggleDialog = () => setIsModalUserOpen(old => !old);

  const handleCloseSnackbar = () =>
    setSnackbarOptions(old => ({ ...old, isOpen: false }));

  const onSubmitEditForm = async (
    user: CreateUserWithCredentialsProperties,
  ) => {
    try {
      await saveUserMutate({ ...user, id: userSelected.id });

      setSnackbarOptions({ isOpen: true, message: 'User updated' });

      toggleDialog();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Dialog open={isModalUserOpen} onClose={toggleDialog}>
        <DialogTitle>Update user</DialogTitle>
        <DialogContent>
          <SaveUserForm
            defaultValues={userSelected}
            isLoading={isLoading}
            onSubmit={onSubmitEditForm}
            hiddenPassword={true}
          />
        </DialogContent>
      </Dialog>

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
          <UserListItem
            index={index}
            user={user}
            handleDeleteUser={handleDeleteUser}
            handleUpdateUser={handleUpdateUser}
            key={v4()}
          />
        ))}
      </List>
    </>
  );
}
