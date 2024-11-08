// Import required modules
const express = require('express'); // Import Express to create the router
const bcrypt = require('bcrypt'); // Import bcrypt to hash passwords
const router = express.Router(); // Create a new router instance
const db = require('../config/db'); // Import the MySQL database configuration

// Main route to handle the home page logic
router.get('/', async (req, res) => {
  // Check if the user is authenticated using Auth0
  const isAuthenticated = req.oidc.isAuthenticated();
  const user = isAuthenticated ? req.oidc.user : null;

  // If user is authenticated, proceed to check or update user information in the database
  if (isAuthenticated && user) {
    const { sub: auth0Id, name, email } = user; // Extract user information from Auth0 token

    // Generate a hashed password (for demonstration, using Auth0 ID as a password placeholder)
    const hashedPassword = await bcrypt.hash(auth0Id, 10); // Ideally, use a real password from user input

    try {
      // Query the database to check if the user exists by Auth0 ID
      const [results] = await db.execute('SELECT * FROM users1 WHERE auth0_id = ?', [auth0Id]);

      if (results.length === 0) {
        // If user does not exist, insert a new user into the database with a hashed password
        await db.execute(
          'INSERT INTO users1 (auth0_id, name, email, password) VALUES (?, ?, ?, ?)',
          [auth0Id, name, email, hashedPassword]
        );
        console.log('New user added:', name);
      } else {
        // If user exists, update their name, email, and password in the database
        await db.execute(
          'UPDATE users1 SET name = ?, email = ?, password = ? WHERE auth0_id = ?',
          [name, email, hashedPassword, auth0Id]
        );
        console.log('User updated:', name);
      }
    } catch (error) {
      console.error('Error while interacting with the database:', error); // Log database errors
      return res.status(500).send('Internal Server Error'); // Send error response
    }
  }

  // Render a response based on the authentication status of the user
  res.send(`
    ${isAuthenticated ? `
      <h2>Welcome, ${user.name}!</h2>
      <img src="${user.picture}" alt="${user.name}" style="border-radius: 50%;" width="100" height="100" />
      <p><a href="/logout">logout</a> to log out.</p>
    ` : `
      <p><a href="/login">login</a> to log in.</p>
    `}
  `);
});

// Login route - redirects user to the Auth0 login page
router.get('/login', (req, res) => {
  res.oidc.login();
});

// Logout route - logs the user out and redirects them to the home page
router.get('/logout', (req, res) => {
  //res.oidc.logout({ returnTo: 'http://localhost:4000' });
  res.logout();
  //res.redirect('/login');
});

module.exports = router; // Export the router for use in app.js


