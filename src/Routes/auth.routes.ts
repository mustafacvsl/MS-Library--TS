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
router.get('/getbooks', authController.listBooksUsers.bind(authController));

export = router;
