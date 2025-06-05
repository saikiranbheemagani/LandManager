const request = require('supertest');
const { app } = require('../local2'); // Import your Express app

describe('CSM Project Routes', () => {
    let accessToken;
    let projectRequestId;

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
  
    // Test GET /projects (getProjects)
    describe('GET /projects', () => {
        it('retrieves projects for a CSM user', async () => {
            const res = await request(app)
                .get('/projects')
                .set('Cookie', `accessToken=${accessToken}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('projects');
            // Additional assertions for the response
        });
    });

    // Test POST /projects/requests (createProjectRequest)
    describe('POST /projects/requests', () => {
        it('creates a project request', async () => {
            const newProjectRequestData = {
                title: 'New Project Request',
                category: 'project',
                description: 'Project Request Description',
                assetID: '6579ffeadbf8597a1a87cb86',
                // sender: 'CSM User'
            };

            const res = await request(app)
                .post('/projects/requests')
                .set('Cookie', `accessToken=${accessToken}`)
                .send(newProjectRequestData);

            expect(res.statusCode).toEqual(200);
            console.log
            projectRequestId = res.body.data._id; // Store project request ID for further tests
        });
    });

    // // Test PUT /projects/requests (updateProjectRequest)
    // describe('PUT /projects/requests', () => {
    //     it('updates a project request', async () => {
    //         const updatedProjectRequestData = {
    //             // projectID: projectRequestId,
    //             newStatus: 'inprogress'
    //         };

    //         const res = await request(app)
    //             .put('/projects/requests')
    //             .query({projectId:projectRequestId})
    //             .set('Cookie', `accessToken=${accessToken}`)
    //             .send(updatedProjectRequestData);

    //         expect(res.statusCode).toEqual(200);
    //     });
    // });

    // Test GET /comments (getComments)
describe('GET /comments', () => {
    it('retrieves comments for a project', async () => {
        const res = await request(app)
            .get('/comments')
            .query({ project_id: projectRequestId })
            .set('Cookie', `accessToken=${accessToken}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('comments');
        // Additional assertions for the response
    });
});

// Test POST /comments (postComments)
describe('POST /comments', () => {
    it('posts a new comment for a project', async () => {
        const newCommentData = {
            proj_id: projectRequestId,
            proj_title: 'Project Title',
            content: 'This is a new comment',
            sender: 'CSM',
            notifToken: 'someNotifToken' // If applicable
        };

        const res = await request(app)
            .post('/comments')
            .set('Cookie', `accessToken=${accessToken}`)
            .send(newCommentData);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Comments updated successfully');
        // Additional assertions for the response
    });
});

    // Test DELETE /projects/requests (cancelProjectRequest)
    describe('DELETE /projects/requests', () => {
        it('deletes a project request', async () => {
            const res = await request(app)
                .delete('/projects/requests')
                .query({ projectID: projectRequestId })
                .set('Cookie', `accessToken=${accessToken}`);

            expect(res.statusCode).toEqual(200);
        });
    });

    // Clean up if necessary in afterAll block
    // ...
});
