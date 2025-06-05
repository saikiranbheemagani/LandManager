import React, { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Person, Email, Lock, AssignmentInd } from '@mui/icons-material';
import Layout from '../components/Layout'; // Adjust the import path
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    // Implement your registration logic here
    console.log('Registration data:', { username, email, password, role });
    navigate('/User/dashboard')
  };

  return (
    <Layout>
      <Paper elevation={3} className="p-6" style={{ width: '300px', padding: '20px', margin: 'auto' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>

        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            startAdornment: <Person color="action" className="mr-1" />,
          }}
        />

        <TextField
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: <Email color="action" className="mr-1" />,
          }}
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: <Lock color="action" className="mr-1" />,
          }}
        />

        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            startAdornment={<AssignmentInd color="action" className="mr-1" />}
          >
            <MenuItem value="ADM">ADM</MenuItem>
            <MenuItem value="CSM">CSM</MenuItem>
            <MenuItem value="LM">LM</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegister}
          className="mt-4"
        >
          Register
        </Button>
      </Paper>
    </Layout>
  );
};

export default RegistrationPage;





 