import React, { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Container,
  Grid,
  Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import colorTheme from '../utils/theme';
const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const validatePassword = (password) => {
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    return password.length >= 8 && hasNumber && hasLetter;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validatePassword(user.password)) {
      setError('Password must be at least 8 characters and include at least 1 number and 1 letter.');
      return;
    }
    if (user.password !== user.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    localStorage.setItem('user', JSON.stringify({ username: user.username, password: user.password }));
    navigate('/booklist');
  };
  return (
    <Container component="main" maxWidth="xs" sx={{ position: "relative", zIndex: 9, display: "flex", alignItems: "center", height: "100vh" }}>
      <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }} elevation={6}>
        <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={user.username}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={!!error}
                helperText={error}
                value={user.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Repeat the password"
                type="password"
                id="confirmPassword"
                error={!!error}
                helperText={error}
                value={user.confirmPassword}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3, mb: 2,
                  backgroundColor: colorTheme.buttonBackgroundColor,
                  '&:hover': {
                    backgroundColor: colorTheme.whiteColor,
                    color: colorTheme.buttonBackgroundColor
                  },
                  textTransform: "capitalize"
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
          <Box textAlign="center">
            <Typography variant="body2">
              Already signed up?{' '}
              <Link component="button" variant="body2" onClick={() => navigate('/signin')}>
                Go to sign in.
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUp;
