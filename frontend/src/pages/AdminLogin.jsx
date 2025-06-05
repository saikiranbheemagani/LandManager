import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Box,
  CssBaseline,
  Link,
} from '@mui/material';
import { useAuth } from '../AuthContext';
import { adminLogin } from '../api';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate =useNavigate();
  const handleLogin = async () => {
    try {
      event.preventDefault(); // Prevent default form submission

      setLoading(true);

      // Call the adminLogin API function
      const response = await adminLogin(email, password);

      //  console.log(response.accessToken)
      // Assuming the API response contains a token
      // const { token } = response;
      // document.cookie = `accessToken=${response.accessToken}; Secure; SameSite=None;`;
      // document.cookie = `refreshToken=${response.refreshToken}; Secure; SameSite=None;`;
      // document.cookie = `role=${response.role}; Secure; SameSite=None;`;
      // Log in the user by calling the login function from the AuthContext
      login(response.accessToken, response.refreshToken, response.role);
      navigate('/user/dashboard');

    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4, marginTop: 8 }}>
        <Typography component="h1" variant="h5" sx={{ marginBottom: 4 }}>
          Landmanager
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          disabled={loading}
          sx={{ marginTop: 2 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
        </Button>
        <Box mt={2}>
          <Link href="#" color="textSecondary">
            Forgot password?
          </Link>
        </Box>
      </Paper>
      <Box mt={5}>
        <Typography variant="body2" color="textSecondary" align="center">
          @Landmanager 2023 Pvt. Ltd.
        </Typography>
      </Box>
    </Container>
  );
};

export default AdminLogin;
