import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Response } from 'express';
import { promisify } from 'util';
const jwt = require('jsonwebtoken');
import AuthRepository from './AuthRepository';
import { getConfig } from '../../infrastructure/config';
const compareAsync = promisify(require('bcrypt').compare);
const hashAsync = promisify(require('bcrypt').hash);

@injectable()
class AuthService {
    private readonly config = getConfig();

    constructor(@inject(AuthRepository) private authrepository: AuthRepository) {}

    async registerUser(name: string, email: string, password: string): Promise<any> {
        const hashedPassword = await hashAsync(password + 'password:password' + name, 10);
        const user = await this.authrepository.registerUser(name, email, hashedPassword);

        return user;
    }

    async loginUser(email: string, password: string): Promise<string> {
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

        return token;
    }
}

export default AuthService;
