// app.js
const express = require('express');
const app = express();

// Serve static files from the "public" directory
app.use(express.static('public'));

// Route for the homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


const express = require('express');
const app = express();

// Parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Serve the HTML form
app.get('/', (req, res) => {
  res.send(`
    <form method="POST" action="/submit">
      <input type="text" name="username" placeholder="Username">
      <input type="password" name="password" placeholder="Password">
      <button type="submit">Submit</button>
    </form>
  `);
});

// Handle form submission
app.post('/submit', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  // Process the form data (e.g., validate, save to a database)

  res.send(`Form submitted with username: ${username} and password: ${password}`);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
