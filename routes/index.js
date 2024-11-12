const express = require('express');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const router = express.Router();

dotenv.config();

// Main route to handle the home page logic
router.get('/', async (req, res) => {
  const isAuthenticated = req.oidc.isAuthenticated();
  const user = isAuthenticated ? req.oidc.user : null;

  if (isAuthenticated && user) {
    const { sub: auth0Id, name, email } = user;
    const hashedPassword = await bcrypt.hash(auth0Id, 10);

    try {
      const [existingUser] = await db.execute('SELECT * FROM users1 WHERE auth0_id = ?', [auth0Id]);

      if (!existingUser) {
        // New user, insert into database
        await db.execute('INSERT INTO users1 (auth0_id, name, email, password) VALUES (?, ?, ?, ?)', [auth0Id, name, email, hashedPassword]);
        console.log('New user added:', name);
      } else {
        // Existing user, update details in the database
        await db.execute('UPDATE users1 SET name = ?, email = ?, password = ? WHERE auth0_id = ?', [name, email, hashedPassword, auth0Id]);
        console.log('User updated:', name);
      }

      res.send('<h2>Welcome User</h2><p><a href="/logout">Logout</a></p>');
    } catch (error) {
      console.error('Error interacting with the database:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    // If not authenticated, show a login link
    res.send(`<p>You are not logged in. <a href="/login">Login</a> to continue.</p>`);
  }
});

// Login route (redirects to Auth0 for login)
router.get('/login', (req, res) => {
  res.oidc.login();
});

// Logout route (logs out user and redirects to home)
router.get('/logout', (req, res) => {
  res.oidc.logout({ returnTo: 'http://localhost:4000' });
});

module.exports = router;
