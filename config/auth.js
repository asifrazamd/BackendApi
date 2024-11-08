// Import the Auth0 authentication middleware from express-openid-connect
const { auth } = require('express-openid-connect');

// Define the Auth0 configuration options
const authConfig = {
  authRequired: false,            // Optional: Specify if authentication is required for all routes
  auth0Logout: true,              // Enable Auth0 logout to clear Auth0 session upon logout
  secret: 'a long, randomly-generated string stored in env', // A secure secret for session encryption (use environment variable in production)
  baseURL: 'http://localhost:4000', // Base URL of the application
  clientID: 'WmDMKGzPy4E7RXttfZvfwCZ0PKQcqL05', // Auth0 application client ID
  issuerBaseURL: 'https://dev-2chouv8oftcdqsmq.us.auth0.com' // Auth0 domain URL
};

// Export the configuration for use in app.js
module.exports = authConfig;
