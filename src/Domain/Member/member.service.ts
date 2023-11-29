import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import MemberEntity from './member.entity';
import MemberRepository from './member.repository';
import { Response } from 'express';
import { ClientSession } from 'mongoose';
import { errorHandlerMiddleware } from '../../middleware/errorhandlerMiddleware';
import AuthRepository from '../User/Auth.repository';

@injectable()
class MemberService {
    constructor(@inject(MemberRepository) private memberRepository: MemberRepository, @inject(AuthRepository) private authRepository: AuthRepository) {}

    @errorHandlerMiddleware
    async userExists(email: string, session: ClientSession): Promise<boolean> {
        const user = await this.authRepository.findUserByEmail(email);
        return !!user;
    }

    @errorHandlerMiddleware
    async addMember(name: string, email: string, res: Response, session: ClientSession): Promise<any> {
        const existingMember = await this.memberRepository.findMemberByEmail(email, session);
        if (existingMember) {
            res.status(400).json({ message: 'Member with this email already exists' });
            return;
        }

        const userExists = await this.userExists(email, session);

        if (!userExists) {
            res.status(400).json({ message: 'User with this email does not exist. Please register as a user first.' });
            return;
        }

        const addedMember = await this.memberRepository.addMember(name, email, session);
        res.status(201).json({ member: addedMember, message: 'Member added successfully' });
    }
}

export default MemberService;
