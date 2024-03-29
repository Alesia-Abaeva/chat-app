import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const Loader: React.FC = () => {
  return (
    <div>
      <Backdrop
        sx={{ color: '#0daba0', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Loader;
