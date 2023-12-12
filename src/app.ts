import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { getConfig } from './infrastructure/config';
import Logging from './infrastructure/Logging';
import authorRoutes from './Routes/AuthRoutes';
import bookRoutes from './Routes/BookRoutes';
import executiveRoutes from './Routes/ExecutiveRoutes';
import memberRoutes from './Routes/MemberRoutes';

const morgan = require('morgan');

const router = express();
const config = getConfig();

router.use(morgan('dev'));

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

    // router.use(errorHandlerMiddleware);
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
