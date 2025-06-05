// auth.test.js
const request = require('supertest');
const {app, server } = require('../local2'); // Import your Express app

describe('Customer Authentication Routes', () => {

  // Test for sendOTP
  describe('POST /sendOTP', () => {
    it('should send OTP', async () => {
      const res = await request(app)
        .post('/auth/user/sendotp')
        .send({ phoneno: '+919704238206' });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('phoneno');
      expect(res.body).toHaveProperty('hash');
      // Add more expectations as necessary
    });
  });

  // Test for verifyOTP
  describe('POST /verifyOTP', () => {
    it('should verify OTP', async () => {
      const otpResponse = await request(app)
        .post('/auth/user/sendotp')
        .send({ phoneno: '+919704238206' });

      const res = await request(app)
        .post('/auth/user/verifyotp')
        .send({ 
          phoneno: '+919704238206', 
          hash: otpResponse.body.hash, 
          otp: otpResponse.body.otp // Replace with a valid OTP
        });

      expect(res.statusCode).toEqual(202);
      expect(res.body).toHaveProperty('accessToken');
      expect(res.body).toHaveProperty('refreshToken');
      // Add more expectations as necessary
    });
  }, 10000);

  // Add more tests for other routes...

});

describe('Admin/MOD/LM Authentication Routes', () => {
  let userCredentials = { email: 'lm@landmanager.com', password: 'lm' };
  let accessToken;

  // Login Route Test
  describe('POST /user/login', () => {
    it('should authenticate user and return token', async () => {
      const res = await request(app)
        .post('/auth/user/login')
        .send(userCredentials);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('accessToken');
      accessToken = res.body.accessToken; // Store access token for logout test
    });
  });

  // Logout Route Test
  describe('GET /user/logout', () => {
    it('should log out the user', async () => {
      const res = await request(app)
        .get('/auth/user/logout')
        .set('Cookie', `accessToken=${accessToken}`); // Use the stored access token

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('msg', 'Logout Successful');
    });
  });

  // Additional tests for error cases, such as incorrect credentials
});
