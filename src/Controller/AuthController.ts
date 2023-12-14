import { errorHandlerMiddleware } from '../middleware/ErrorHandlerMiddleware';
import { NextFunction, Request, Response, Router } from 'express';

import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import AuthApplicationService, { AuthApplicationLayer } from '../ApplicationService/AuthApplicationLayer';
import { handleResponse } from '../infrastructure/Response';

export const Injector = Symbol.for('AuthApplicationService');
@injectable()
export class AuthController {
    constructor(@inject(AuthApplicationLayer) public authapplicationlayer: AuthApplicationLayer) {}

    async register(req: Request, res: Response): Promise<void> {
        const { name, email, password } = req.body;

        const result = await this.authapplicationlayer.registerUser(name, email, password);

        handleResponse(res, 201, { result }, 'User registered successfully');
    }

    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        const result = await this.authapplicationlayer.loginUser(email, password, res);

        handleResponse(res, 200, { token: result }, 'Login successful');
    }
}
