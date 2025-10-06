"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const apiRoutes_1 = __importDefault(require("./routes/apiRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8090;
// Middleware to parse JSON requests
app.use(express.json());
app.use((0, cookie_parser_1.default)());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
// Example API endpoint
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the server! What do we have here. What about now. And more.' });
});
app.use('/api/auth/google', userRoutes_1.default);
app.use('/api', apiRoutes_1.default);
// Catch-all handler for any request that doesn't match the above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
