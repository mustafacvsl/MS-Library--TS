import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { ClientSession } from 'mongoose';
import { errorHandlerMiddleware } from '../../middleware/errorhandlerMiddleware';
import MemberRepository from './member.repository';
import AuthRepository from '../User/Auth.repository';
import { isValidEmail } from '../../infrastructure/validEmail';

@injectable()
export class MemberService {
    constructor(@inject(MemberRepository) private memberRepository: MemberRepository, @inject(AuthRepository) private authRepository: AuthRepository) {}

    @errorHandlerMiddleware
    async addMember(name: string, email: string, res: Response, session: ClientSession): Promise<any> {
        if (!isValidEmail(email)) {
            res.status(400).json({ message: 'Invalid email address' });
            return;
        }

        const userExists = await this.authRepository.findUserByEmail(email);
        if (!userExists) {
            res.status(400).json({ message: 'No user found with this email. Please register as a user first.' });
            return;
        }

        const emailExists = await this.memberRepository.emailExists(email, session);
        if (emailExists) {
            res.status(400).json({ message: 'A member already exists with this email' });
            return;
        }

        const existingMember = await this.memberRepository.findMemberByEmail(email, session);
        if (existingMember) {
            res.status(400).json({ message: 'A member already exists with this email' });
            return;
        }

        const addedMember = await this.memberRepository.addMember(name, email, session);
        res.status(201).json({ member: addedMember, message: 'Member added successfully' });
    }
}

export default MemberService;
