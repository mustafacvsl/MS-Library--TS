import { TYPES } from '../infrastructure/Types';
import express from 'express';
import { Container } from 'inversify';
import { AuthController } from '../Controller/auth.controller';

const router = express.Router();
const container = new Container();
const authController = container.get<AuthController>(TYPES.AuthController);

router.post('/register', async (req, res) => {
    await authController.register(req, res);
});

router.post('/login', async (req, res) => {
    await authController.login(req, res);
});

export = router;
