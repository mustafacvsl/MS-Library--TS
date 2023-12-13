import express from 'express';
import { AuthController } from '../Controller/AuthController';
import { JoiMiddleware, Schema } from '../middleware/JoiMiddleware';
import { container } from '../infrastructure/İnversify';

const router = express.Router();

const authController = container.resolve<AuthController>(AuthController);

router.post('/register', JoiMiddleware(Schema.register), authController.register.bind(authController));
router.post('/login', JoiMiddleware(Schema.login), authController.login.bind(authController));

export = router;
