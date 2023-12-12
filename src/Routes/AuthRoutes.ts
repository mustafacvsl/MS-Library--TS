import express from 'express';
import { AuthController } from '../Controller/AuthController';
import { JoiMiddleware, Schema } from '../middleware/JoiMiddleware';
import AuthRepository from '../Domain/User/AuthRepository';
import { Container } from 'inversify';
import TransactionHandler from '../middleware/TransactionMiddleware';
import AuthService from '../Domain/User/AuthService';
import AuthApplicationService from '../ApplicationService/AuthApplicationLayer';
const router = express.Router();
const transaction = new TransactionHandler();
const authreposiypry = new AuthRepository();
const authservice = new AuthService(authreposiypry);
const authapplicationservice = new AuthApplicationService(authservice, transaction);
const authController = new AuthController(authapplicationservice);

router.post('/register', JoiMiddleware(Schema.register), authController.register.bind(authController));
router.post('/login', JoiMiddleware(Schema.login), authController.login.bind(authController));

export = router;
