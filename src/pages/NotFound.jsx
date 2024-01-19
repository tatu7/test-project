import React from 'react';
import { Box, Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import notfounfImg from "../assets/404.png";
import colorTheme from '../utils/theme';
const NotFoundPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const handleGoHome = () => {
    navigate('/');
  };

  const handleReloadPage = () => {
    window.location.reload();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        p: 3,
        gap: 2,
        textAlign: 'center',
      }}
    >
      <Box
        component="img"
        sx={{
          width: '100%',
          maxWidth: '600px',
          height: 'auto',
          marginBottom: 2,
          position: "relative",
          zIndex: 9
        }}
        src={notfounfImg}
        alt="Not Found"
      />
      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoHome}
          sx={{
            marginRight: theme.spacing(1), backgroundColor: colorTheme.buttonBackgroundColor,
            '&:hover': {
              backgroundColor: colorTheme.whiteColor,
              color: colorTheme.buttonBackgroundColor
            },
            textTransform: "capitalize"
          }}
        >
          Go Home Page
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleReloadPage}
          sx={{
            backgroundColor: colorTheme.whiteColor, color: colorTheme.buttonBackgroundColor, borderColor: colorTheme.buttonBackgroundColor,
            '&:hover': {
              backgroundColor: colorTheme.buttonBackgroundColor, color: colorTheme.whiteColor, borderColor: colorTheme.buttonBackgroundColor,
            },
            textTransform: "capitalize"
          }}
        >
          Reload Page
        </Button>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
