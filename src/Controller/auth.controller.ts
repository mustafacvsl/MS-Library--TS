import { errorHandlerMiddleware } from '../middleware/errorhandlerMiddleware';
import { NextFunction, Request, Response, Router } from 'express';
import container from '../infrastructure/inversify';
import Author from '../Domain/User/auth.entity';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import { AuthApplicationService } from '../ApplicationService/AuthApplicationService';
import { handleResponse } from '../infrastructure/response';

@injectable()
export class AuthController {
    constructor(@inject('AuthApplicationService') private authApplicationService: AuthApplicationService) {}

    @errorHandlerMiddleware
    async register(req: Request, res: Response): Promise<void> {
        const { name, email, password } = req.body;
        const user = await this.authApplicationService.registerUser(name, email, password, res);
        handleResponse(res, 201, { user }, 'User registered successfully');
    }

    @errorHandlerMiddleware
    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        const token = await this.authApplicationService.loginUser(email, password, res);
        handleResponse(res, 200, { token }, 'Login successful');
    }
}
