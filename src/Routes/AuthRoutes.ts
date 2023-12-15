import express from 'express';
import { AuthController } from '../Controller/AuthController';
import { JoiMiddleware, Schema } from '../middleware/JoiMiddleware';
import configureContainer from '../infrastructure/Inversify';
import { TransactionMiddleware } from '../middleware/TransactionMiddleware';
import { Container } from 'inversify';
const router = express.Router();

const container = new Container();
configureContainer(container);

const authController = container.resolve<AuthController>(AuthController);

router.post('/register', TransactionMiddleware, JoiMiddleware(Schema.register), authController.register.bind(authController));
router.post('/login', JoiMiddleware(Schema.login), authController.login.bind(authController));

export = router;
