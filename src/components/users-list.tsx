import { Avatar } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useUsers } from '../hooks/use-users';
import { stringAvatar } from '../utils/theme';

export function UsersList() {
  const { data } = useUsers();

  console.log(data);
  return (
    <>
      <Typography variant="h5">Users</Typography>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {data?.map((user, index) => (
          <>
            {index > 0 && <Divider variant="inset" component="li" />}
            <ListItem alignItems="flex-start" key={user?.id}>
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
