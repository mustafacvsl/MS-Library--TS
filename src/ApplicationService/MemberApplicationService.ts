import MemberService from '../Domain/Member/member.service';
import MemberEntity from '../Domain/Member/member.entity';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { errorHandlerMiddleware } from '../middleware/errorhandlerMiddleware';
import { Response } from 'express';
import TransactionHandler from '../infrastructure/Transaction/TransactionManager';

@injectable()
export class MemberApplicationService {
    constructor(@inject(MemberService) private memberService: MemberService, @inject(TransactionHandler) private transactionHandler: TransactionHandler) {}

    @errorHandlerMiddleware
    async addMember(name: string, email: string, res: Response): Promise<void> {
        await this.transactionHandler.runInTransaction(async (session) => {
            await this.memberService.addMember(name, email, res, session);
        });
    }
}
