import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';
import { MessageExample } from './fakeData';

interface ChatsProps {
  data: MessageExample[];
}

const Chats: React.FC<ChatsProps> = ({ data }) => {
  if (!data.length) {
    return (
      <Typography variant="h6" noWrap component="div" sx={{ mt: 6, ml: 4 }}>
        ooops...
      </Typography>
    );
  }

  return (
    <List sx={{ mt: 6, overflow: 'hidden', overflowY: 'auto' }}>
      {data.map(({ primary, secondary, person }, index) => (
        <ListItem button key={index + person}>
          <ListItemAvatar>
            <Avatar alt="Profile Picture" src={person} />
          </ListItemAvatar>
          <ListItemText primary={primary} secondary={secondary} />
        </ListItem>
      ))}
    </List>
  );
};

export default Chats;
