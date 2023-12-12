import { errorHandlerMiddleware } from '../middleware/ErrorHandlerMiddleware';
import { NextFunction, Request, Response, Router } from 'express';

import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import AuthApplicationService from '../ApplicationService/AuthApplicationLayer';
import { handleResponse } from '../infrastructure/Response';

export const Injector = Symbol.for('AuthApplicationService');
@injectable()
export class AuthController {
    constructor(@inject('AuthApplicationService') public authApplicationService: AuthApplicationService) {}

    @errorHandlerMiddleware
    async register(req: Request, res: Response): Promise<void> {
        const { name, email, password } = req.body;

        const result = await this.authApplicationService.registerUser(name, email, password, res);

        handleResponse(res, 201, { result }, 'User registered successfully');
    }

    @errorHandlerMiddleware
    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        const result = await this.authApplicationService.loginUser(email, password, res);

        handleResponse(res, 200, { token: result }, 'Login successful');
    }

    private isValidEmail(email: string): boolean {
        return email.includes('@gmail.com');
    }
}
