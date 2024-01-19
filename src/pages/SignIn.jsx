import React, { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Container,
  Grid,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import colorTheme from '../utils/theme';
const SignIn = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const storedUser = localStorage.getItem('user');
    const userData = storedUser && JSON.parse(storedUser);

    if (
      userData &&
      userData.username === credentials.username &&
      userData.password === credentials.password
    ) {
      navigate('/booklist');
    } else {
      setError('Invalid username or password');
    }
  };
  return (
    <Container component="main" maxWidth="xs" sx={{ position: "relative", zIndex: 9, display: "flex", alignItems: "center", height: "100vh" }} >
      <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }} elevation={6}>
        <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                value={credentials.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={credentials.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                sx={{
                  mt: 3, mb: 2,
                  backgroundColor: colorTheme.buttonBackgroundColor,
                  '&:hover': {
                    backgroundColor: colorTheme.whiteColor,
                    color: colorTheme.buttonBackgroundColor
                  },
                  textTransform: "capitalize"
                }}
                type="submit"
                fullWidth
                variant="contained"
              >
                Sign In
              </Button>
              {error && (
                <Typography color="error" textAlign="center">
                  {error}
                </Typography>
              )}
              <Box textAlign="center">
                <Typography variant="body2">
                  You have not Accoun?{' '}
                  <Link component="button" variant="body2" onClick={() => navigate('/signup')}>
                    Go to sign up.
                  </Link>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignIn;
