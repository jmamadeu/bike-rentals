import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import {
  Avatar,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';
import { UserProperties } from '../models/user-model';
import { stringAvatar } from '../utils/theme';

type UserListItemProperties = {
  index: number;
  handleDeleteUser: (id: string) => void;
  handleUpdateUser: (user: UserProperties) => void;
  user: UserProperties;
};

export function UserListItem({
  index,
  user,
  handleDeleteUser,
  handleUpdateUser,
}: UserListItemProperties) {
  return (
    <>
      {index > 0 && <Divider variant="inset" component="li" />}
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <>
            <IconButton
              onClick={() => handleDeleteUser(user.id)}
              edge="end"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              onClick={() => handleUpdateUser(user)}
              edge="end"
              aria-label="edit"
            >
              <EditIcon />
            </IconButton>
          </>
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
  );
}
