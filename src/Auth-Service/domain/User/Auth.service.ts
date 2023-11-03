import { inject, injectable } from 'inversify';
import AuthRepository from './Auth.repository';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import Author, { IAuthorModel } from './Author';
import 'reflect-metadata';

@injectable()
class AuthService {
    constructor(@inject(AuthRepository) private authrepository: AuthRepository) {}

    async register(name: string, email: string, password: string): Promise<IAuthorModel> {
        if (typeof password !== 'string') {
            throw new Error('Password must be a string');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new Author({
            name,
            email,
            password: hashedPassword
        });

        try {
            const savedUser = await user.save();
            return savedUser;
        } catch (error) {
            throw error;
        }
    }

    async login(email: string, password: string): Promise<string> {
        const user = await this.authrepository.findUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        try {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                throw new Error('Authentication failed');
            }
        } catch (error) {
            throw error;
        }

        const token = jwt.sign({ email: user.email, userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
        return token;
    }
}

export default AuthService;
