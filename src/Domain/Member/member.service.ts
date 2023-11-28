import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import MemberEntity from './member.entity';
import MemberRepository from './member.repository';
import { Response } from 'express';
import { ClientSession } from 'mongoose';
import { errorHandlerMiddleware } from '../../middleware/errorhandlerMiddleware';

@injectable()
class MemberService {
    constructor(@inject(MemberRepository) private memberRepository: MemberRepository) {}

    @errorHandlerMiddleware
    async addMember(name: string, email: string, res: Response, session: ClientSession): Promise<any> {
        const existingMember = await this.memberRepository.findMemberByEmail(email, session);
        if (existingMember) {
            res.status(400).json({ message: 'Member with this email already exists' });
            return;
        }

        const addedMember = await this.memberRepository.addMember(name, email, session);
        res.status(201).json({ member: addedMember, message: 'Member added successfully' });
    }
}

export default MemberService;
