import { NextFunction, Request, Response, Router } from 'express';
import container from '../infrastructure/inversify';
import Author from '../Domain/User/auth.entity';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import ApplicationService, { AuthApplicationService } from '../ApplicationService/AuthApplicationService';

@injectable()
export class AuthController {
    constructor(@inject('AuthApplicationService') private authapplicationservice: AuthApplicationService) {}

    async register(req: Request, res: Response) {
        const { name, email, password } = req.body;

        const user = await this.authapplicationservice.registerUser(name, email, password);

        res.status(201).json({ user });
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const token = await this.authapplicationservice.loginUser(email, password);

        res.status(200).json({ token });
    }
}
