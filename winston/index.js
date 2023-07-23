const express = require('express');
const app = express();
const port = 3000;
const logger = require('./logger');

// Log requests middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Sample route that throws an error for demonstration purposes
app.get('/error', (req, res) => {
  // Simulate an error
  try {
    throw new Error('This is a sample error.');
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

// 404 route
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
