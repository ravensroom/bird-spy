import express from 'express';
import dummyMiddleware from './middlewares/index.js';
import SSRRoute from './routes/SSRRoute.js';
import APIRoute from './routes/APIRoute.js';

const app = express();

// Apply middleware
// app.use(dummyMiddleware);

// Register routes
app.use('/ssr', SSRRoute);
app.use('/api', APIRoute);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});