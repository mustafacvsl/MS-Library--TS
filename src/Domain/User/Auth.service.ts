import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import authEntity from './auth.entity';
import AuthRepository from './Auth.repository';
import { Response } from 'express';
import { errorHandlerMiddleware } from '../../middleware/errorhandlerMiddleware';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import * as crypto from 'crypto';
import { promisify } from 'util';
import Book, { IBookModel } from '../Book/Book';

const compareAsync = promisify(bcrypt.compare);

@injectable()
class AuthService {
    constructor(@inject(AuthRepository) private authrepository: AuthRepository) {}

    @errorHandlerMiddleware
    async register(name: string, email: string, password: string, res: Response): Promise<any> {
        if (typeof password !== 'string') {
            throw new Error('Password must be a string');
        }

        const existingUser = await this.authrepository.findUserByEmail(email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        const user = new authEntity({
            name,
            email,
            password: hashedPassword
        });

        const savedUser = await user.save();
        return savedUser;
    }

    @errorHandlerMiddleware
    async listBooksUsers(): Promise<IBookModel[]> {
        return this.authrepository.getAllBooks();
    }

    @errorHandlerMiddleware
    async login(email: string, password: string, res: Response): Promise<any> {
        const user = await this.authrepository.findUserByEmail(email);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const passwordMatch = await compareAsync(password, user.password);
        if (!passwordMatch) {
            throw new Error('Authentication failed');
        }

        const token = jwt.sign({ email: user.email, userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
        return token;
    }
}

export default AuthService;
