// Import the Auth0 authentication middleware from express-openid-connect
const { auth } = require('express-openid-connect');
const dotenv=require("dotenv")

dotenv.config();

// Define the Auth0 configuration options
/*const authConfig = {
  authRequired: false,            // Optional: Specify if authentication is required for all routes
  auth0Logout: true,              // Enable Auth0 logout to clear Auth0 session upon logout
  secret: 'a long, randomly-generated string stored in env', // A secure secret for session encryption (use environment variable in production)
  baseURL: 'http://localhost:4000', // Base URL of the application
  clientID: 'WmDMKGzPy4E7RXttfZvfwCZ0PKQcqL05', // Auth0 application client ID
  issuerBaseURL: 'https://dev-2chouv8oftcdqsmq.us.auth0.com' // Auth0 domain URL
};*/

const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  /*routes: {
    login: false, // To define a custom login path if needed
    postLogoutRedirect: 'http://localhost:4000', // Where to redirect after logout
  },*/
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
};

// Export the configuration for use in app.js
module.exports = authConfig;
