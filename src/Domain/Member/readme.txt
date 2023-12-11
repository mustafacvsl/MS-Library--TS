İnversify.ts

import { Container } from 'inversify';
import { AuthController /*, Injector as authcontrollerınjector*/ } from '../Controller/auth.controller';
import { BookController } from '../Controller/book.controller';
import AuthService from '../Domain/User/Auth.service';
import BookService from '../Domain/Book/Book.service';
import BookApplicationService from '../ApplicationService/BookApplicationService';
import AuthRepository from '../Domain/User/Auth.repository';
import BookRepository from '../Domain/Book/Book.repository';
import { AuthApplicationService /*, Injector as authApplicationInjector*/ } from '../ApplicationService/AuthApplicationService';
import ExecutiveService from '../Domain/Executive/executive.service';
import { ExecutiveApplicationService } from '../ApplicationService/ExecutiveApplicationService';
import { ExecutiveController } from '../Controller/executive.controller';
import { MemberController } from '../Controller/Member.controller';
import { MemberApplicationService } from '../ApplicationService/MemberApplicationService';
import MemberService from '../Domain/Member/member.service';
import MemberRepository from '../Domain/Member/member.repository';
import TransactionHandler from './Transaction/TransactionManager';
import { errorHandlerMiddleware } from '../middleware/errorhandlerMiddleware';
import { container } from 'tsyringe';

const configurecontainer = (container: Container) => {
    container.bind<TransactionHandler>(TransactionHandler).to(TransactionHandler);
    container.bind<AuthApplicationService>(AuthApplicationService).to(AuthApplicationService);
    container.bind<AuthController>(AuthController).to(AuthController);
    container.bind<BookController>(BookController).to(BookController);
    container.bind<AuthService>(AuthService).to(AuthService);
    container.bind<BookService>(BookService).to(BookService);
    container.bind<BookApplicationService>(BookApplicationService).to(BookApplicationService);
    container.bind<AuthRepository>(AuthRepository).to(AuthRepository);
    container.bind<BookRepository>(BookRepository).to(BookRepository);
    container.bind<ExecutiveService>(ExecutiveService).to(ExecutiveService);
    container.bind<ExecutiveApplicationService>(ExecutiveApplicationService).to(ExecutiveApplicationService);
    container.bind<ExecutiveController>(ExecutiveController).to(ExecutiveController);
    container.bind<MemberApplicationService>(MemberApplicationService).to(MemberApplicationService);
    container.bind<MemberController>(MemberController).to(MemberController);
    container.bind<MemberService>(MemberService).to(MemberService);
    container.bind<MemberRepository>(MemberRepository).to(MemberRepository);
};

export default configurecontainer;

_____________________________________________________________________________________________

Auth.Routes.ts 



import express from 'express';
import { AuthController } from '../Controller/auth.controller';

import AuthRepository from '../Domain/User/Auth.repository';
import { Container } from 'inversify';
import TransactionHandler from '../infrastructure/Transaction/TransactionManager';
import AuthService from '../Domain/User/Auth.service';
import AuthApplicationService from '../ApplicationService/AuthApplicationService';
const router = express.Router();
const transaction = new TransactionHandler();
const authreposiypry = new AuthRepository();
const authservice = new AuthService(authreposiypry);
const authapplicationservice = new AuthApplicationService(authservice, transaction);
const authController = new AuthController(authapplicationservice);

router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));

export = router;


_____________________________________________________________________________________________


app.ts 

import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { getConfig } from './infrastructure/config';
import Logging from './infrastructure/Logging';
import authorRoutes from './Routes/auth.routes';
import bookRoutes from './Routes/book.routes';
import executiveRoutes from './Routes/executive.routes';
import memberRoutes from './Routes/member.routes';
import { errorHandlerMiddleware } from './middleware/errorhandlerMiddleware';
import { JoiMiddleware, Schemas } from './middleware/JoiMiddleware';
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



_____________________________________________________________________________________________