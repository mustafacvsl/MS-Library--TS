import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import authEntity from './auth.entity';
import AuthRepository from './Auth.repository';
import { Response } from 'express';
import { errorHandler } from '../../middleware/errorhandlerMiddleware';
import { handleResponse } from '../../infrastructure/response';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import * as crypto from 'crypto';

@injectable()
class AuthService {
    constructor(@inject(AuthRepository) private authrepository: AuthRepository) {}

    @errorHandler()
    async register(name: string, email: string, password: string, res: Response): Promise<any> {
        if (typeof password !== 'string') {
            handleResponse(res, 400, null, 'Password must be a string');
            return;
        }

        const existingUser = await this.authrepository.findUserByEmail(email);
        if (existingUser) {
            handleResponse(res, 400, null, 'User with this email already exists');
            return;
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

    @errorHandler()
    async login(email: string, password: string, res: Response): Promise<any> {
        const user = await this.authrepository.findUserByEmail(email);
        if (!user) {
            handleResponse(res, 401, null, 'Invalid credentials');
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            handleResponse(res, 401, null, 'Authentication failed');
            return;
        }

        const token = jwt.sign({ email: user.email, userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
        return token;
    }
}

export default AuthService;
