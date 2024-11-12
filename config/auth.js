// Import the Auth0 authentication middleware from express-openid-connect
const { auth } = require('express-openid-connect');
const dotenv = require("dotenv");

// Load environment variables from a .env file, which is essential for security of sensitive data
dotenv.config();

/**
 * Auth0 Configuration Object
 * 
 * - `authRequired`: Determines if authentication is required for all routes. 
 *   When set to `false`, only routes specifically defined to require authentication will enforce it.
 * - `auth0Logout`: Enables Auth0-managed logout, ensuring users are logged out of both Auth0 and the application.
 * - `secret`: Secret key used to sign cookies and secure session data. Loaded from an environment variable.
 * - `baseURL`: The base URL of your application (e.g., `http://localhost:4000` for local development). 
 *   This is used as a callback URL and for redirects.
 * - `clientID`: The Client ID of your Auth0 application, retrieved from the Auth0 dashboard.
 * - `issuerBaseURL`: The base URL of your Auth0 tenant, which identifies the Auth0 domain used for authorization.
 */
const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
};

/**
 * Exports the Auth0 configuration object, making it available to be used for authentication in app.js.
 * By importing and using `authConfig`, the app can securely manage user authentication using Auth0.
 */
module.exports = authConfig;
