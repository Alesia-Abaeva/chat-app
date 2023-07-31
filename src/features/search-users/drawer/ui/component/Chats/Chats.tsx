import React from 'react';
import { onSnapshot } from 'firebase/firestore';
import { Typography } from '@mui/material';
import { useAppDispatch, useAuthState } from 'shared/hook';
import { changeUser } from 'shared/store/reducers/ChatsSlice';
import { DOC } from 'shared/lib';
import { ChatListItem } from 'shared/ui';

const Chats: React.FC = () => {
  const dispatch = useAppDispatch();

  const { id } = useAuthState();
  const [chat, setChat] = React.useState<[string, Data][]>([]);

  const handleClick = ({ userInfo }: Data) => {
    dispatch(changeUser({ user: userInfo, currentUserID: id }));
  };

  // получаем данные о чатах юзера
  React.useEffect(() => {
    const unsub = onSnapshot(DOC.userChats(id), (doc) => {
      setChat(Object.entries(doc.data() as ChatsData));
    });

    return () => {
      unsub;
    };
  }, []); // TODO: необходимо менять данные при клике!
  // TODO: перенести в store????

  if (!chat.length) {
    return (
      <Typography variant="h6" noWrap component="div" sx={{ mt: 6, ml: 4 }}>
        you don't have any active chats yet, enter your friend's name in the
        search
      </Typography>
    );
  }

  return (
    <>
      {chat.map(([idChats, chatData]) => {
        const isCurrentUserChat = chatData.userInfo?.id === id;

        return (
          <ChatListItem
            key={idChats}
            onClick={() => handleClick(chatData)} // если id активного юзера совпадает с id созданного чата, меняется иконка и название чата
            src={
              isCurrentUserChat
                ? undefined
                : (chatData.userInfo?.photo as string | undefined)
            }
            isCurrentUser={isCurrentUserChat}
            name={
              isCurrentUserChat ? 'Saved Messages' : chatData.userInfo?.name
            }
            message={chatData.lastMessage?.text}
          />
        );
      })}
    </>
  );
};

export default Chats;
