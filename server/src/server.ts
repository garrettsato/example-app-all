import { Request, Response, NextFunction } from 'express';
import apiRoutes from './routes/apis/apiRoutes'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {getMongoConnectionManager} from "./dependencies/mongoConnectionManager";

// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8090;


async function main() {
    // Middleware to parse JSON requests
    app.use(express.json());
    app.use(cookieParser());

    const allowedOrigins = ['http://localhost:3000'];
    app.use(cors({
        origin: allowedOrigins,
        credentials: true, // allow cookies/Authorization
        methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }));

    // 3) (optional but helpful) respond to preflight explicitly
    app.options('*', cors({
        origin: allowedOrigins,
        credentials: true,
    }));


    // Serve static files from the React app
    // app.use(express.static(path.join(__dirname, 'client/build')));

    // Example API endpoint
    app.get('/api/hello', (req: Request, res: Response) => {
        res.json({ message: 'Hello from the server! What do we have here. What about now. And more.' });
    });

    app.use('/api', apiRoutes);


    // Catch-all handler for any request that doesn't match the above
    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });


    async function shutdown(signal: string) {
        console.log(`[${signal}] received. Closing HTTP server…`);
        // Stop accepting new connections; finish in-flight requests

        try {
            await getMongoConnectionManager().closeMongo();
            // await closeOtherStuff(); // e.g. stop HTTP server, flush logs
            process.exit(0);
        } catch (err) {
            console.error("Error during shutdown", err);
            process.exit(1);
        }
    }

    ["SIGTERM", "SIGINT"].forEach(sig => process.on(sig as NodeJS.Signals, shutdown));
}

main().catch((e) => {
    console.error("❌ Failed to start:", e);
    process.exit(1);
});
