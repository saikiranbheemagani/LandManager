describe('Registration Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/registration'); // Directs Cypress to the Registration page
    });
  
    it('allows a user to register', () => {
      // Assuming the registration process involves entering a phone number and verifying OTP
      const testPhoneNumber = '+919704238206'; // Replace with a valid test number
      const testOTP = '1234'; // Replace with a valid test OTP
  
      // Fill out the phone number field
      cy.get('input[name="phoneNumber"]').type(testPhoneNumber);
      cy.contains('Send OTP').click();
  
      // Mocking OTP send and verify response
      cy.intercept('POST', '/auth/user/sendOTP', {
        statusCode: 200,
        body: {
          hash: 'testhash', // Use a mock hash
          otp: testOTP // Optional if you're not showing the OTP in the UI
        }
      });
  
      cy.intercept('POST', '/auth/user/verifyOTP', {
        statusCode: 200,
        body: {
          accessToken: 'testaccesstoken',
          refreshToken: 'testrefreshtoken',
          role: 'CSM' // Assuming a role is returned
        }
      });
  
      // Fill out the OTP field
      cy.get('input[name="otp"]').type(testOTP);
      cy.contains('Verify OTP').click();
  
      // Verify redirection to dashboard after successful registration
      cy.url().should('include', '/user/dashboard');
    });
  
    // Add more tests as needed, like testing for invalid inputs, server errors, etc.
  });
  