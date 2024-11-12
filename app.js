// Import required modules
const express = require('express'); // Express framework for creating a server
const dotenv = require("dotenv"); // dotenv to load environment variables from a .env file
const { auth } = require('express-openid-connect'); // Auth0 middleware for authentication
const authConfig = require('./config/auth'); // Custom Auth0 configuration file
const routes = require('./routes'); // General application route handlers
const propertiesRoutes = require("./routes/properties.js"); // Route handlers for properties API

dotenv.config(); // Load environment variables from .env file

const app = express(); // Initialize the Express app

// Middleware to parse incoming JSON requests
app.use(express.json());

// Apply Auth0 authentication middleware globally to the app
app.use(auth(authConfig)); // Configures Auth0 to protect routes based on the config settings

// Register general routes from the `routes` directory, accessible from the root path
app.use('/', routes); // Mounts main routes at the root of the app

// Register property routes with a `/api` prefix
app.use("/api", propertiesRoutes); // Attaches property-related routes under `/api`

// Start the server on port 4000 and log a message when ready
app.listen(4000, () => {
  console.log('Server started on http://localhost:4000');
});
