import { Request, Response } from 'express';

import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import AuthApplicationService from '../ApplicationService/AuthApplicationService';
import { HandleResponse } from '../infrastructure/Response';

@injectable()
export class AuthController {
    constructor(@inject(AuthApplicationService) public authapplicationservice: AuthApplicationService) {}

    async register(req: Request, res: Response): Promise<void> {
        const { name, email, password } = req.body;

        const result = await this.authapplicationservice.registerUser(name, email, password);

        HandleResponse(res, 201, { result }, 'User registered successfully');
    }

    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        const result = await this.authapplicationservice.loginUser(email, password, res);

        HandleResponse(res, 200, { token: result }, 'Login successful');
    }
}
