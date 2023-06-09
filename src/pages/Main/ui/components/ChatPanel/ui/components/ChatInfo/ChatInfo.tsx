import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ButtonIcon } from 'shared/ui';
import { DRAWER_WIDTH } from 'shared/const/common';

const ChatInfo: React.FC<IChild> = ({ mobile, setMobile }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: `${DRAWER_WIDTH}px`,
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <ButtonIcon onClick={setMobile}>
            <ArrowBackIosNewIcon />
          </ButtonIcon>

          <Avatar
            alt="Profile Picture"
            src={'<Avatar alt="Profile Picture" src={person} />'}
          />
          <Box>
            <Typography variant="h6" noWrap component="div">
              Name CHAT
            </Typography>
            <Typography noWrap component="p">
              descriptions
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ChatInfo;
