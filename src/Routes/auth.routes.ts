import express from 'express';
import { AuthController } from '../Controller/auth.controller';
import { Schemas, ValidateJoi } from '../middleware/Joi';
import ApplicationService from '../ApplicationService/AuthApplicationService';
import AuthService from '../Domain/User/Auth.service';
import AuthRepository from '../Domain/User/Auth.repository';

const router = express.Router();
const authrepository = new AuthRepository();
const authservice = new AuthService(authrepository);
const applicationService = new ApplicationService(authservice);
const authController = new AuthController(applicationService);

router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));

export = router;
