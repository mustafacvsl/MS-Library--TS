import AuthService from '../Domain/User/Auth.service';
import Author from '../Domain/User/auth.entity';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { errorHandlerMiddleware } from '../middleware/errorhandlerMiddleware';
import { Request, Response } from 'express';
import { promisify } from 'util';
import TransactionHandler from '../infrastructure/Transaction/TransactionManager';
import Book from '../Domain/Book/Book';
import AuthRepository from '../Domain/User/Auth.repository';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const hashAsync = promisify(bcrypt.hash);

@injectable()
export class AuthApplicationService {
    constructor(@inject(AuthService) private authService: AuthService, @inject(TransactionHandler) private transactionhandler: TransactionHandler) {}

    @errorHandlerMiddleware
    async registerUser(name: string, email: string, password: string, res: Response): Promise<void> {
        const hashedPassword = await hashAsync(password + 'sadasdda' + name, 10);

        const user = await this.authService.registerUser(name, email, hashedPassword, res);

        res.status(201).json({ user, message: 'User registered successfully' });
    }

    @errorHandlerMiddleware
    async listBooksUsers(res: Response) {
        await this.transactionhandler.runInTransaction(async (session) => {
            const books = await this.authService.listBooksUsers();
            res.status(200).json({ books, message: 'Books listed for users' });
        });
    }

    private generateJWTToken(user: any) {
        return jwt.sign({ email: user.email, userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
    }

    @errorHandlerMiddleware
    async loginUser(email: string, password: string, res: Response): Promise<void> {
        const user = await this.authService.login(email, password, res);
        const token = this.generateJWTToken(user);
        res.status(200).json({ token, message: 'Login successful' });
    }
}
