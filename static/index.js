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
