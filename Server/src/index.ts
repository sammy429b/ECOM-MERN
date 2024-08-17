import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import DBconnection from './utils/DBconnect';
import PasswordRoute from './routes/password.route';
import authRoute from './routes/auth.route';
import { createProxyMiddleware } from 'http-proxy-middleware';

// Load environment variables
dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT || 5000;
const accessOrigin = process.env.ORIGIN_URL || 'http://localhost:3000';

const corsOptions = {
    origin: accessOrigin,
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

// const corsOptions = {
//     origin: 'http://localhost:5173', // Frontend URL
//     credentials: true, // Allow credentials (cookies, authorization headers, etc.)
// };

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/", authRoute);
app.use("/", PasswordRoute);

// Base route
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "TypeScript with express" });
});

// Proxy
app.use(
    '/weather',
    createProxyMiddleware({
        target: accessOrigin, // Replace with the actual weather API URL
        changeOrigin: true,
        pathRewrite: {
            '^/weather': '', // Rewrites /weather to /
        },
    })
);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

// Start the server after DB connection
DBconnection().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
        console.log(`CORS Origin: ${accessOrigin}`);
    });
}).catch(err => {
    console.error("Failed to connect to the database", err);
    process.exit(1);
});
