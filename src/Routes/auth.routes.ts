import express from 'express';
import { AuthController } from '../Controller/auth.controller';
import { Schemas, ValidateJoi } from '../middleware/Joi';
import { AuthApplicationService } from '../ApplicationService/AuthApplicationService';
import AuthService from '../Domain/User/Auth.service';
import AuthRepository from '../Domain/User/Auth.repository';

const registerSchema = Schemas.author.create;
const router = express.Router();
const authrepository = new AuthRepository();
const authservice = new AuthService(authrepository);
const applicationService = new AuthApplicationService(authservice);
const authController = new AuthController(applicationService);

router.post('/register', ValidateJoi(registerSchema), authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));

export = router;
