import React from 'react';
import { Box } from '@mui/material';
import layoutImg from "../assets/layout.png"
const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'white',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'black',
          transform: 'translateX(50%)',
          zIndex: -1,
        }
      }}
    >
      <Box
        component="img"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '70vw',
          objectFit: 'cover',
        }}
        src={layoutImg}
        alt="background"
      />
      {children}
    </Box>
  );
};

export default Layout;
