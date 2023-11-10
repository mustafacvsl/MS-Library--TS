import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './infrastructure/config';
import Logging from './infrastructure/Logging';
import authorRoutes from './Routes/auth.routes';
import bookRoutes from './Routes/book.routes';
import executiveRoutes from './Routes/executive.routes';
import memberRoutes from './Routes/member.routes';
import { errorHandler } from './middleware/errorhandlerMiddleware';

const router = express();

mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('connected mongo db');
        StartServer();
    })
    .catch((error) => {
        Logging.error('unable to connect');
        Logging.error(error);
    });

const StartServer = () => {
    router.use((req, res, next) => {
        Logging.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });

        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    router.use(errorHandler);
    router.use('/authors', authorRoutes);
    router.use('/books', bookRoutes);
    router.use('/executive', executiveRoutes);
    router.use('/member', memberRoutes);

    router.use((req, res, next) => {
        const error = new Error('Not found');

        Logging.error(error);

        res.status(404).json({
            message: error.message
        });
    });

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
};
