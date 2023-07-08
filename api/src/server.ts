import express from 'express';
import bodyParser from 'body-parser';
import { enableCORS, handleErrors } from './middlewares/index.js';
import APIRoute from './routes/APIRoute.js';
import passport from 'passport';
import './passport.js';

const app = express();

// Apply middleware
app.use(bodyParser.json({ limit: '5mb' }));
app.use(enableCORS);
app.use(express.json());
app.use(passport.initialize());

// Register routes
app.use('/api', APIRoute);
app.use(handleErrors);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
