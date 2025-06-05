import { useState } from 'react';
import { Button, TextField, Grid, Container, Typography, Link, CssBaseline, Paper, Box } from '@mui/material';
import { Send, Phone, Lock } from '@mui/icons-material';
import { sendOTP, verifyOTP } from '../api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function Registration() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOTP] = useState('');
  const [sentOTP, setSentOTP] = useState(false);
  const [hash, setHash] = useState(null);
  const [verified, setVerified] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from the context

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

  const handleSendOTP = async () => {
    try {
      const response = await sendOTP(phoneNumber);
      setHash(response.hash);
      setSentOTP(true);
      console.log(response.otp)
      setOTP(response.otp)
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleVerifyOTP = async () => {
    if (!hash) {
      console.error('No hash available for OTP verification.');
      return;
    }

    try {
      const response = await verifyOTP(phoneNumber, otp, hash);

      // document.cookie = `accessToken=${response.accessToken}; Secure; SameSite=None;`;
      // document.cookie = `refreshToken=${response.refreshToken}; Secure; SameSite=None;`;
      // Update the authenticated status using the login function
      login(response.accessToken, response.refreshToken, response.role );
      setVerified(true);
      navigate('/user/dashboard');
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 8 }}>
      <CssBaseline />
      <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4 }}>
        <Typography component="h1" variant="h5" sx={{ marginBottom: 4 }}>
          Landmanager
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              InputProps={{
                startAdornment: (
                  <Phone color="action" />
                ),
              }}
            />
          </Grid>
          {sentOTP ? (
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="OTP"
                name="otp"
                value={otp}
                onChange={handleOTPChange}
                InputProps={{
                  startAdornment: (
                    <Lock color="action" />
                  ),
                }}
              />
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={sentOTP ? handleVerifyOTP : handleSendOTP}
              startIcon={<Send />}
              fullWidth
            >
              {sentOTP ? 'Verify OTP' : 'Send OTP'}
            </Button>
          </Grid>
        </Grid>
        {sentOTP && !verified && <p>Waiting for OTP verification...</p>}
        {verified && (
          <Typography sx={{ marginTop: 2 }}>
            OTP has been verified. You can now proceed to the{' '}
            <Link href="/user/dashboard" color="primary">
              dashboard
            </Link>
            .
          </Typography>
        )}
      </Paper>
      <Box mt={5}>
        <Typography variant="body2" color="textSecondary" align="center">
          @Landmanager 2023 Pvt. Ltd.
        </Typography>
      </Box>
    </Container>
  );
}

export default Registration;

