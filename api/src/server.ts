import express from 'express';
import { enableCORS } from './middlewares/index.js';
import APIRoute from './routes/APIRoute.js';

const app = express();

// Apply middleware
app.use(enableCORS);
app.use(express.json());

// Register routes
app.use('/api', APIRoute);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
