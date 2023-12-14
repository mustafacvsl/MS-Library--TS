import express from 'express';
import { AuthController } from '../Controller/AuthController';
import { JoiMiddleware, Schema } from '../middleware/JoiMiddleware';
import { container } from '../infrastructure/İnversify';
import { errorHandlerMiddleware } from '../middleware/ErrorHandlerMiddleware';
import { transactionMiddleware } from '../middleware/TransactionMiddleware';
const router = express.Router();

const authController = container.resolve<AuthController>(AuthController);

router.post('/register', errorHandlerMiddleware, transactionMiddleware, JoiMiddleware(Schema.register), authController.register.bind(authController));
router.post('/login', errorHandlerMiddleware, JoiMiddleware(Schema.login), authController.login.bind(authController));

export = router;
