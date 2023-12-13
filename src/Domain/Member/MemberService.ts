import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { ClientSession } from 'mongoose';
import { errorHandlerMiddleware } from '../../middleware/ErrorHandlerMiddleware';
import MemberRepository from './MemberRepository';
import AuthRepository from '../User/AuthRepository';

@injectable()
export class MemberService {
    constructor(@inject(MemberRepository) private memberRepository: MemberRepository, @inject(AuthRepository) private authRepository: AuthRepository) {}

    @errorHandlerMiddleware
    async addMember(name: string, email: string, res: Response): Promise<any> {
        const userExists = await this.authRepository.findUserByEmail(email);
        if (!userExists) {
            res.status(400).json({ message: 'No user found with this email. Please register as a user first.' });
            return;
        }

        const existingMember = await this.memberRepository.findMemberByEmail(email);
        if (existingMember) {
            res.status(400).json({ message: 'A member already exists with this email' });
            return;
        }

        const addedMember = await this.memberRepository.addMember(name, email);
        res.status(201).json({ member: addedMember, message: 'Member added successfully 😊' });
    }
}

export default MemberService;
