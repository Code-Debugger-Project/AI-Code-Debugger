require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { chatCompletion } = require('./controllers/chatController');
const { healthCheck } = require('./controllers/healthController');

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Health route
app.get('/api/test', healthCheck);

// Chat completion endpoint
app.post('/api/chat', chatCompletion);

// Centralized error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'An error occurred while processing your request',
    details: err?.message || 'Unknown error'
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
