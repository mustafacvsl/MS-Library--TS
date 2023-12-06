import { errorHandlerMiddleware } from '../middleware/errorhandlerMiddleware';
import { NextFunction, Request, Response, Router } from 'express';

import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { AuthApplicationService } from '../ApplicationService/AuthApplicationService';
import { handleResponse } from '../infrastructure/response';
import Book, { IBook } from '../Domain/Book/Book';

export const Injector = Symbol.for('AuthApplicationService');
@injectable()
export class AuthController {
    constructor(@inject('AuthApplicationService') public authApplicationService: AuthApplicationService) {}

    @errorHandlerMiddleware
    async register(req: Request, res: Response): Promise<void> {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            handleResponse(res, 400, null, 'Name ,e-mail,password are required.');
            return;
        }

        if (typeof password !== 'string' || !this.isValidEmail(email) || password.length < 5) {
            handleResponse(res, 400, null, 'Invalid e-mail forma . Only Gmail addresses are allowed || password must be string || password must be longer than 5 characters');
        }

        const result = await this.authApplicationService.registerUser(name, email, password, res);

        handleResponse(res, 201, { user: result }, 'User registered successfully');
    }

    @errorHandlerMiddleware
    async listBooksUsers(req: Request, res: Response): Promise<void> {
        const books = await this.authApplicationService.listBooksUsers(res);

        handleResponse(res, 200, { books }, 'Books listed for users');
    }

    @errorHandlerMiddleware
    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        if (!email || !password) {
            handleResponse(res, 400, null, 'e-mail,password are required for login.');
            return;
        }
        const result = await this.authApplicationService.loginUser(email, password, res);

        handleResponse(res, 200, { token: result }, 'Login successful');
    }

    private isValidEmail(email: string): boolean {
        return email.includes('@gmail.com');
    }
}
