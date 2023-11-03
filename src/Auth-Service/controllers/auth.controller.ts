import { NextFunction, Request, Response, Router } from 'express';
import container from '../../infrastructure/inversify';
import Author from '../domain/User/Author';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import ApplicationService from '../ApplicationService/UserApplicationService';

@injectable()
export class AuthController {
    constructor(@inject('ApplicationService') private applicationService: ApplicationService) {}

    async register(req: Request, res: Response) {
        const { name, email, password } = req.body;

        const user = await this.applicationService.registerUser(name, email, password);

        res.status(201).json({ user });
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const token = await this.applicationService.loginUser(email, password);

        res.status(200).json({ token });
    }
}
