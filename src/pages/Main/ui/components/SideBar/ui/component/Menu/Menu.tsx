import React from 'react';
import { Logout, Settings, AddAPhoto } from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Snackbar,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { auth, signOut } from 'firebase.config';
import { useLogOut } from 'shared/hook';
import { FileInput } from 'shared/ui';
import uploadFiles from 'shared/lib/firebase/store/uploadFiles';

const Profile: React.FC = () => {
  // TODO: add user data
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState<string | ArrayBuffer | null>(
    null
  );

  const logOutUser = useLogOut();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
    console.log(auth.currentUser?.uid, 'i am user');
  };

  const handleClose = () => {
    setOpen(false);
    console.log('close');
  };

  const handleLogOut = () => {
    signOut(auth)
      .then(() => logOutUser())
      .catch(() => {
        setError(true);
      });
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log('this is file', event?.target?.files);
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];
    await uploadFiles(file);
    // TODO: update store!
  };

  return (
    <>
      <Snackbar open={error} autoHideDuration={6000}>
        <Alert severity="error" sx={{ width: '100%' }}>
          There was an error while signing out
        </Alert>
      </Snackbar>

      <Tooltip title="Account settings" sx={{ pl: 0.2 }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: '300px',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>

        <Divider />

        <MenuItem
          // onClick={handleFileUpload}
          aria-label="upload picture"
          component="label"
        >
          <ListItemIcon>
            <AddAPhoto fontSize="small" />
          </ListItemIcon>
          <FileInput handleFileUpload={handleFileUpload} />
          Change foto
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>

        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default Profile;
