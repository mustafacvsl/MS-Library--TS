import AuthService from '../Domain/User/Auth.service';
import Author from '../Domain/User/auth.entity';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { handleResponse } from '../infrastructure/response';
import { errorHandler } from '../middleware/errorhandlerMiddleware';
import { Request, Response } from 'express';
@injectable()
export class AuthApplicationService {
    constructor(@inject(AuthService) private authService: AuthService) {}

    @errorHandler()
    async registerUser(name: string, email: string, password: string, res: Response): Promise<void> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new Author({ name, email, password: hashedPassword });
        const savedUser = await user.save();
        handleResponse(res, 201, { user: savedUser }, 'User registered successfully');

        handleResponse(res, 500, null, 'Internal Server Error');
    }

    private generateJWTToken(user: any) {
        return jwt.sign({ email: user.email, userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
    }

    @errorHandler()
    async loginUser(email: string, password: string, res: Response): Promise<void> {
        const user = await this.authService.login(email, password, res);
        const token = this.generateJWTToken(user);
        handleResponse(res, 200, { token }, 'Login successful');

        handleResponse(res, 500, null, 'Internal Server Error');
    }
}

export default AuthApplicationService;
