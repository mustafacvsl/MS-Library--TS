import express from 'express';
import { AuthController } from '../Controller/auth.controller';
import { Schemas, JoiMiddleware } from '../middleware/JoiMiddleware';
import { AuthApplicationService } from '../ApplicationService/AuthApplicationService';
import AuthService from '../Domain/User/Auth.service';
import AuthRepository from '../Domain/User/Auth.repository';
import TransactionHandler from '../infrastructure/Transaction/TransactionManager';

const registerSchema = Schemas.author.create;
const router = express.Router();
const authrepository = new AuthRepository();
const authservice = new AuthService(authrepository);
const transactionhandler = new TransactionHandler();
const applicationService = new AuthApplicationService(authservice, transactionhandler);
const authController = new AuthController(applicationService);

router.post('/register', JoiMiddleware(registerSchema), authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));
router.get('/getbooks', authController.listBooksUsers.bind(authController));

export = router;
