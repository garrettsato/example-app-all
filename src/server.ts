import { Request, Response, NextFunction } from 'express';
import userRoutes from './routes/userRoutes'
import apiRoutes from './routes/apiRoutes'
import cookieParser from 'cookie-parser';

// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8090;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Example API endpoint
app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the server! What do we have here. What about now. And more.' });
});

app.use('/api/auth/google', userRoutes);
app.use('/api', apiRoutes);


// Catch-all handler for any request that doesn't match the above
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); 
});