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
        if (typeof password !== 'string') {
            throw new Error('Password must be a string');
        }

        const existingUser = await this.authrepository.findUserByEmail(email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        const hashedPassword = await hashAsync(password + 'sadasdda' + name, 10);
        const user = await this.authrepository.registerUser(name, email, hashedPassword);

        return user;
    }

    @errorHandlerMiddleware
    async listBooksUsers(): Promise<unknown[]> {
        return this.authrepository.getAllBooks();
    }

    @errorHandlerMiddleware
    async login(email: string, password: string, res: Response): Promise<any> {
        const user = await this.authrepository.loginUser(email);

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const passwordMatch = await compareAsync(password, user.password);
        if (!passwordMatch) {
            throw new Error('Authentication failed');
        }

        const token = this.generateToken(user);

        res.status(200).json({
            token,
            message: token
        });
    }
    private generateToken(user: IAuthorModel): string {
        const expiresIn = '1h';

        const payload = {
            userId: user._id,
            email: user.email
        };

        const token = jwt.sign(payload, this.config.secretKey, { expiresIn });
        return token;
    }
}

export default AuthService;
