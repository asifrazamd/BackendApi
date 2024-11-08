// Import required modules
const express = require('express'); // Express framework for creating a server
const dotenv=require("dotenv")
const { auth } = require('express-openid-connect'); // Auth0 middleware for authentication
const authConfig = require('./config/auth'); // Auth0 configuration file
const routes = require('./routes'); // Custom route handlers
dotenv.config();


const app = express(); // Initialize the Express app

// Apply Auth0 authentication middleware globally to the app
app.use(auth(authConfig)); // Protects all routes using Auth0 with provided config

// Register routes defined in the routes directory, accessible from root path
app.use('/', routes); // Attach route handlers to the root path

// Start the server on port 4000 and log a message when ready
app.listen(4000, () => {
  console.log('Server started on http://localhost:4000');
});
