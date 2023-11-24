import MemberService from '../Domain/Member/member.service';
import MemberEntity from '../Domain/Member/member.entity';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { errorHandlerMiddleware } from '../middleware/errorhandlerMiddleware';
import { Response } from 'express';

@injectable()
export class MemberApplicationService {
    constructor(@inject(MemberService) private memberService: MemberService) {}

    @errorHandlerMiddleware
    async addMember(name: string, email: string, res: Response): Promise<void> {
        const addedMember = await this.memberService.addMember(name, email, res);
        res.status(201).json({ member: addedMember, message: 'Member added successfully' });
    }
}
