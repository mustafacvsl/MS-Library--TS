import AuthService from '../Domain/User/Auth.service';
import Author from '../Domain/User/auth.entity';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { errorHandlerMiddleware } from '../middleware/errorhandlerMiddleware';
import { Request, Response } from 'express';
import { promisify } from 'util';
import * as crypto from 'crypto';
import TransactionHandler from '../infrastructure/Transaction/TransactionManager';
import Book from '../Domain/Book/Book';

const hashAsync = promisify(bcrypt.hash);

@injectable()
export class AuthApplicationService {
    constructor(@inject(AuthService) private authService: AuthService, @inject(TransactionHandler) private transactionhandler: TransactionHandler) {}

    @errorHandlerMiddleware
    async registerUser(name: string, email: string, password: string, res: Response): Promise<void> {
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        const user = new Author({ name, email, password: hashedPassword });
        const savedUser = await user.save();

        const token = this.generateJWTToken(savedUser);

        res.status(201).json({ user: savedUser, token, message: 'User registered successfully' });
    }

    @errorHandlerMiddleware
    async listBooksUsers(res: Response) {
        await this.transactionhandler.runInTransaction(async (session) => {
            const books = await Book.find({}, 'Books :').session(session);
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
