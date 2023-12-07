import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Response } from 'express';
import { errorHandlerMiddleware } from '../../middleware/errorhandlerMiddleware';
import { promisify } from 'util';
const jwt = require('jsonwebtoken');
import AuthRepository from './Auth.repository';
import { IAuthorModel } from './auth.entity';
import { handleResponse } from '../../infrastructure/response';
import { getConfig } from '../../infrastructure/config';

const compareAsync = promisify(require('bcrypt').compare);
const hashAsync = promisify(require('bcrypt').hash);

@injectable()
class AuthService {
    private readonly config = getConfig();

    constructor(@inject(AuthRepository) private authrepository: AuthRepository) {}

    @errorHandlerMiddleware
    async registerUser(name: string, email: string, password: string, res: Response): Promise<any> {
        const existingUser = await this.authrepository.findUserByEmail(email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        const hashedPassword = await hashAsync(password + 'password:password' + name, 10);
        const user = await this.authrepository.registerUser(name, email, hashedPassword);

        return user;
    }

    @errorHandlerMiddleware
    async listBooksUsers(): Promise<unknown[]> {
        return this.authrepository.getAllBooks();
    }

    @errorHandlerMiddleware
    async loginUser(email: string, password: string, res: Response): Promise<string> {
        const user = await this.authrepository.findUserByEmail(email);

        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await compareAsync(password + 'password:password' + user.name, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign({ userId: user._id, email: user.email }, this.config.auth.secretKey, {
            expiresIn: '1h'
        });

        handleResponse(res, 200, { user, token }, 'Login successful');

        return token;
    }
}

export default AuthService;
