import express from 'express';
import { AuthController } from '../Controller/auth.controller';
import { Schemas, JoiMiddleware } from '../middleware/JoiMiddleware';
import { AuthApplicationService } from '../ApplicationService/AuthApplicationService';
import container from '../infrastructure/inversify';
import TransactionHandler from '../infrastructure/Transaction/TransactionManager';
import AuthService from '../Domain/User/Auth.service';
import AuthRepository from '../Domain/User/Auth.repository';
const router = express.Router();

const authController = container.get<AuthController>(AuthController);

router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));
router.get('/getbooks', authController.listBooksUsers.bind(authController));

export = router;
