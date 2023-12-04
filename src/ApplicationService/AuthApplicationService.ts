import AuthService from '../Domain/User/Auth.service';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { errorHandlerMiddleware } from '../middleware/errorhandlerMiddleware';
import { Request, Response } from 'express';
import TransactionHandler from '../infrastructure/Transaction/TransactionManager';

export const Injector = Symbol.for('AuthApplicationService');
@injectable()
export class AuthApplicationService {
    constructor(@inject(AuthService) private authService: AuthService, @inject(TransactionHandler) private transactionhandler: TransactionHandler) {}

    @errorHandlerMiddleware
    async registerUser(name: string, email: string, password: string, res: Response): Promise<void> {
        const user = await this.authService.registerUser(name, email, password, res);

        res.status(201).json({ user });
    }

    @errorHandlerMiddleware
    async listBooksUsers(res: Response): Promise<void> {
        await this.transactionhandler.runInTransaction(async (session) => {
            const books = await this.authService.listBooksUsers();

            res.status(200).json({
                books
            });
        });
    }

    @errorHandlerMiddleware
    async loginUser(email: string, password: string, res: Response): Promise<void> {
        const user = await this.authService.login(email, password, res);

        res.status(200).json({
            user
        });
    }
}

export default AuthApplicationService;
