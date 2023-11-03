import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { Schemas, ValidateJoi } from '../../middleware/Joi';
import ApplicationService from '../ApplicationService/UserApplicationService';
import AuthService from '../domain/User/Auth.service';
import AuthRepository from '../domain/User/Auth.repository';

const router = express.Router();
const authrepository = new AuthRepository();
const authservice = new AuthService(authrepository);
const applicationService = new ApplicationService(authservice);
const authController = new AuthController(applicationService);

router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));

export = router;
