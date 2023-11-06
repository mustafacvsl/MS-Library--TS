import { inject, injectable } from 'inversify';
import MemberRepository from './member.repository';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import memberEntity, { IMemberModel } from './member.entity';
import 'reflect-metadata';

@injectable()
class MemberService {
    constructor(@inject(MemberRepository) private memberrepository: MemberRepository) {}

    async register(userId: string, email: string): Promise<IMemberModel> {
        if (typeof userId !== 'string') {
            throw new Error('Password must be a string');
        }

        const user = new memberEntity({
            userId,
            email
        });

        try {
            const savedUser = await user.save();
            return savedUser;
        } catch (error) {
            throw error;
        }
    }

    async login(userId: string, email: string): Promise<string> {
        const user = await this.memberrepository.findUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        const token = jwt.sign({ userId: user._id, email: user.email }, 'your-secret-key', { expiresIn: '1h' });
        return token;
    }
}

export default MemberService;
