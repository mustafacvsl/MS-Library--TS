import AuthService from '../Domain/User/AuthService';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import { Response } from 'express';

@injectable()
export class AuthApplicationService {
    constructor(@inject(AuthService) private authService: AuthService) {}

    async registerUser(name: string, email: string, password: string): Promise<void> {
        return this.authService.registerUser(name, email, password);
    }

    async loginUser(email: string, password: string, res: Response): Promise<string> {
        return this.authService.loginUser(email, password, res);
    }
}

export default AuthApplicationService;
