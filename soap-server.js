const soap = require('soap');
const express = require('express');
const app = express();

// Define las operaciones de cada microservicio de usuario
const service = {
  UserService: {
    UserPort: {
      getUserInfo: function(args) {
        // Logic to get user information
        return { userId: args.userId, username: 'JohnDoe', email: 'john@example.com' };
      },
      editUserInfo: function(args) {
        // Logic to edit user information
        return { status: 'success', message: 'User info updated successfully' };
      },
      editAvatar: function(args) {
        // Logic to edit the user's avatar
        return { status: 'success', message: 'Avatar updated successfully' };
      },
      deleteUser: function(args) {
        // Logic to delete the user account
        return { status: 'success', message: 'Account deleted successfully' };
      }
    }
  }
};

// Defines the WSDL file
const wsdl = './user-service.wsdl'; 

// Start the SOAP server
const port = 8000;
app.listen(port, () => {
  console.log(`SOAP server for user-service listening on port ${port}`);
});

// Define the SOAP service endpoint
soap.listen(app, '/user-service', service, wsdl);
