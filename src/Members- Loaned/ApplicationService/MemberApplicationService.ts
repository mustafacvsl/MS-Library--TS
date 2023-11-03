import MemberService from '../Domain/Member/member.service';
import memberEntity from '../Domain/Member/member.entity';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import { injectable, inject } from 'inversify';
import 'reflect-metadata';

@injectable()
export class MemberApplicationService {
    constructor(@inject(MemberService) private memberservice: MemberService) {}

    async registerUser(userId: string, email: string) {
        const user = new memberEntity({ userId, email });
        const savedUser = await user.save();
        return { user: savedUser };
    }

    private generateJWTToken(user: any) {
        return jwt.sign({ email: user.email, userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
    }

    async loginUser(email: string, password: string) {
        const member = await memberEntity.findOne({ email });

        if (!member) {
            throw new Error('User not found');
        }

        const token = this.generateJWTToken(member);
        return { token };
    }
}

export default MemberApplicationService;
