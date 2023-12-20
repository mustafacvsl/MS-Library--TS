import AuthService from '../Domain/User/AuthService';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import AuthRepository from '../Domain/User/AuthRepository';
import { Response } from 'express';
import { Result } from '../infrastructure/Result';
@injectable()
export class AuthApplicationService {
    constructor(@inject(AuthService) private authService: AuthService, @inject(AuthRepository) private authrepository: AuthRepository) {}

    async registerUser(name: string, email: string, password: string): Promise<Result<null>> {
        const existingUser = await this.authrepository.findUserByEmail(email);
        if (existingUser) {
            return {
                success: false,
                error: {
                    message: 'User with this email already exists'
                }
            };
        } else {
            return this.authService.registerUser(name, email, password);
        }
    }

    async loginUser(email: string, password: string, res: Response): Promise<string> {
        return this.authService.loginUser(email, password);
    }
}

export default AuthApplicationService;
