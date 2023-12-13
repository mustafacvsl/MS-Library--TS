import AuthService from '../Domain/User/AuthService';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { errorHandlerMiddleware } from '../middleware/ErrorHandlerMiddleware';
import { Request, Response } from 'express';
import TransactionHandler from '../middleware/TransactionManager';
import { TransactionMiddleware } from '../middleware/TransactionMiddleware';

@injectable()
export class AuthApplicationLayer {
    constructor(@inject(AuthService) private authService: AuthService, @inject(TransactionHandler) private transactionhandler: TransactionHandler) {}

    @errorHandlerMiddleware
    @TransactionMiddleware
    async registerUser(name: string, email: string, password: string, res: Response): Promise<void> {
        const user = await this.authService.registerUser(name, email, password, res);
        res.status(201).json({ user });
    }

    @errorHandlerMiddleware
    async loginUser(email: string, password: string, res: Response): Promise<string> {
        const token = await this.authService.loginUser(email, password, res);
        return token;
    }
}

export default AuthApplicationLayer;
