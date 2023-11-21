import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import MemberEntity from './member.entity';
import MemberRepository from './member.repository';
import { Response } from 'express';
import { errorHandlerMiddleware } from '../../middleware/errorhandlerMiddleware';

@injectable()
class MemberService {
    constructor(@inject(MemberRepository) private memberRepository: MemberRepository) {}

    @errorHandlerMiddleware
    async addMember(name: string, email: string, res: Response): Promise<any> {
        const existingMember = await this.memberRepository.findMemberByEmail(email);
        if (existingMember) {
            throw new Error('Member with this email already exists');
        }

        const addedMember = await this.memberRepository.addMember(name, email);
        return addedMember;
    }
}

export default MemberService;
