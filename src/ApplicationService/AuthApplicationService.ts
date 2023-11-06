import AuthService from '../Domain/User/Auth.service';
import Author from '../Domain/User/auth.entity';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import { injectable, inject } from 'inversify';
import 'reflect-metadata';

@injectable()
export class AuthApplicationService {
    constructor(@inject(AuthService) private authService: AuthService) {}

    async registerUser(name: string, email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new Author({ name, email, password: hashedPassword });
        const savedUser = await user.save();
        return { user: savedUser };
    }

    private generateJWTToken(user: any) {
        return jwt.sign({ email: user.email, userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
    }

    async loginUser(email: string, password: string) {
        const author = await Author.findOne({ email });

        if (!author) {
            throw new Error('User not found');
        }

        if (!(await bcrypt.compare(password, author.password))) {
            throw new Error('Authentication failed');
        }

        const token = this.generateJWTToken(author);
        return { token };
    }
}

export default AuthApplicationService;
