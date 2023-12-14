import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { errorHandlerMiddleware } from '../middleware/ErrorHandlerMiddleware';
import { Response } from 'express';
import TransactionHandler from '../middleware/TransactionManager';
import MemberService from '../Domain/Member/MemberService';

@injectable()
export class MemberApplicationService {
    constructor(@inject(MemberService) private memberService: MemberService, @inject(TransactionHandler) private transactionHandler: TransactionHandler) {}

    async addMember(name: string, email: string): Promise<void> {
        const addedMember = await this.memberService.addMember(name, email);

        return addedMember;
    }
}
