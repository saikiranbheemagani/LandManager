// profile.test.js
const request = require('supertest');
const {app, server } = require('../local2'); // Import your Express app


describe('Profile Routes', () => {
    let accessToken;
  
    beforeAll(async () => {
      // Simulate sending OTP
      const sendOtpResponse = await request(app)
        .post('/auth/user/sendotp')
        .send({ phoneno: '+919704238206' }); // Use a test phone number
  
      // Simulate verifying OTP (assuming you can get the OTP from the response or a mock)
      const verifyOtpResponse = await request(app)
        .post('/auth/user/verifyotp')
        .send({
          phoneno: '+919704238206',
          hash: sendOtpResponse.body.hash,
          otp: sendOtpResponse.body.otp // Use the OTP from the sendOtpResponse
        });
        // console.log(verifyOtpResponse.body)
      accessToken = verifyOtpResponse.body.accessToken; // Adjust this according to your response structure
    });
  
    // Profile route tests using the 'accessToken'
    describe('GET /profile', () => {
      it('retrieves user profile', async () => {
        const res = await request(app)
          .get('/profile')
          .set('Cookie', `accessToken=${accessToken}`) // Correct header is 'Cookie'
  
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
        // Additional assertions as needed
      });
    });
  
    // Add tests for PUT /profile, DELETE /profile, and GET /profile/lm using the accessToken
    describe('PUT /profile', () => {
      it('updates user profile', async () => {
        const updatedData = {
          // Add fields that you want to update
          name: 'Updated Name',
          email: 'updated@example.com'
        };
  
        const res = await request(app)
          .put('/profile')
          .set('Cookie', `accessToken=${accessToken}`) // Correct header is 'Cookie'
          .send(updatedData);
  
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'User Data Updated successfully');
        // expect(res.body.data).toMatchObject(updatedData); // Ensure the updated data is reflected
      });
    });
  
    // Test for DELETE /profile
    describe('DELETE /profile', () => {
      it('deletes user profile', async () => {
        const res = await request(app)
          .delete('/profile')
          .set('Cookie', `accessToken=${accessToken}`) // Correct header is 'Cookie'
        
          // console.log(`accessToken=${accessToken}`)
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'User Profile deleted successfully');
        
        // Optionally, verify if the user is actually deleted (e.g., by trying to fetch the profile again)
      });
    });
    // Clean up if necessary in afterAll block
  });
