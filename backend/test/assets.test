const request = require('supertest');
const { app } = require('../local2'); // Import your Express app

describe('Asset Routes', () => {
    let accessToken;
    let assetId;
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

    // Test GET /assets
    describe('GET /assets', () => {
        it('retrieves assets by user', async () => {
            const res = await request(app)
                .get('/assets')
                .set('Cookie', `accessToken=${accessToken}`);

            expect(res.statusCode).toEqual(200);
            // Additional assertions for the response
        });
    });

    // Test POST /assets
    describe('POST /assets', () => {
        it('adds a new asset', async () => {
            const newAssetData = {
                // Data structure based on your Asset model
                name: 'New Asset',
                location: 'Some Location',
                // other asset details
            };

            const res = await request(app)
                .post('/assets')
                .set('Cookie', `accessToken=${accessToken}`)
                .send(newAssetData);

            expect(res.statusCode).toEqual(201); // Assuming 201 for created
            // Additional assertions for the response
            assetId = res.body.data._id;
            // console.log(assetId)
        });
    });

    // Test PUT /assets
    describe('PUT /assets', () => {
        it('updates an asset', async () => {
            const updatedAssetData = {
                // id and details to update
                id: assetId,
                name: 'Updated Asset Name'
            };

            const res = await request(app)
                .put('/assets')
                .set('Cookie', `accessToken=${accessToken}`)
                .send(updatedAssetData);

            expect(res.statusCode).toEqual(200);
            // Additional assertions for the response
        });
    });

    // Test DELETE /assets
    describe('DELETE /assets', () => {
        it('removes an asset', async () => {
            const res = await request(app)
                .delete('/assets')
                .query({ id: assetId}) // Assuming the id is passed as a query param
                .set('Cookie', `accessToken=${accessToken}`);

            expect(res.statusCode).toEqual(200);
            // Additional assertions for the response
        });
    });

    // Clean up if necessary in afterAll block
    // ...
});
