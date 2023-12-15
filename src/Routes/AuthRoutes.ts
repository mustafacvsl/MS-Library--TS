import express from 'express';
import { AuthController } from '../Controller/AuthController';
import { JoiMiddleware, Schema } from '../middleware/JoiMiddleware';
import { container } from '../infrastructure/Inversify';
import { TransactionMiddleware } from '../middleware/TransactionMiddleware';
const router = express.Router();

const authController = container.resolve<AuthController>(AuthController);

router.post('/register', TransactionMiddleware, JoiMiddleware(Schema.register), authController.register.bind(authController));
router.post('/login', JoiMiddleware(Schema.login), authController.login.bind(authController));

export = router;
