import React from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import s from './Chats.module.scss';
import { CLOUD, db } from 'firebase.config';
import { useAppDispatch, useAuthState } from 'shared/hook';
import { changeUser } from 'shared/store/reducers/ChatsSlice';

interface ChatsProps {
  findedUsers: AuthUserData[];
  onClick: (user: AuthUserData) => void;
}

const Chats: React.FC<ChatsProps> = ({ findedUsers, onClick }) => {
  const dispatch = useAppDispatch();

  const { id } = useAuthState();
  const [chat, setChat] = React.useState<[string, Data][]>([]);

  const handleClick = ({ userInfo, date, lastMessage }: Data) => {
    dispatch(changeUser({ user: userInfo, currentUserID: id }));
  };

  const handleClickOnFindUser = (user: AuthUserData) => {
    onClick(user);
    dispatch(changeUser({ user, currentUserID: id }));
  };

  // получаем данные о чатах юзера
  React.useEffect(() => {
    const unsub = onSnapshot(doc(db, CLOUD.USER_CHATS, id), (doc) => {
      setChat(Object.entries(doc.data() as ChatsData));
    });

    return () => {
      unsub;
    };
  }, []);

  if ((!findedUsers || !findedUsers.length) && !chat.length) {
    return (
      <Typography variant="h6" noWrap component="div" sx={{ mt: 6, ml: 4 }}>
        ooops...
      </Typography>
    );
  }

  return (
    <List
      sx={{ mt: 6, overflow: 'hidden', overflowY: 'auto' }}
      className={s.scroll}
    >
      {findedUsers.map((user, index) => (
        <ListItem
          button
          key={(user.id as string) + index}
          onClick={() => handleClickOnFindUser(user)}
        >
          <ListItemAvatar>
            <Avatar
              alt="Profile Picture"
              src={user.photo as string | undefined}
            />
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.name} />
        </ListItem>
      ))}
      {!!findedUsers.length && <Divider />}

      {chat.map(([idChats, chatData]) => (
        <ListItem
          button
          key={idChats as string}
          onClick={() => handleClick(chatData)}
        >
          <ListItemAvatar>
            <Avatar
              alt="Profile Picture"
              src={chatData.userInfo.photo as string | undefined}
            />
          </ListItemAvatar>
          <ListItemText
            primary={chatData.userInfo.name}
            secondary={chatData.lastMessage?.text}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default Chats;
