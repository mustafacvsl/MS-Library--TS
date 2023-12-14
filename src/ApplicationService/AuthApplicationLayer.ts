import AuthService from '../Domain/User/AuthService';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { errorHandlerMiddleware } from '../middleware/ErrorHandlerMiddleware';
import { Request, Response } from 'express';
import TransactionHandler from '../middleware/TransactionManager';

@injectable()
export class AuthApplicationLayer {
    constructor(@inject(AuthService) private authService: AuthService, @inject(TransactionHandler) private transactionhandler: TransactionHandler) {}

    async registerUser(name: string, email: string, password: string): Promise<void> {
        const user = await this.authService.registerUser(name, email, password);
        return user;
    }

    async loginUser(email: string, password: string, res: Response): Promise<string> {
        const token = await this.authService.loginUser(email, password, res);
        return token;
    }
}

export default AuthApplicationLayer;
