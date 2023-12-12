import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { errorHandlerMiddleware } from '../middleware/ErrorHandlerMiddleware';
import { Response } from 'express';
import TransactionHandler from '../middleware/TransactionMiddleware';
import MemberService from '../Domain/Member/MemberService';

@injectable()
export class MemberApplicationService {
    constructor(@inject(MemberService) private memberService: MemberService, @inject(TransactionHandler) private transactionHandler: TransactionHandler) {}

    @errorHandlerMiddleware
    async addMember(name: string, email: string, res: Response): Promise<void> {
        await this.transactionHandler.runInTransaction(async (session) => {
            const addedMember = await this.memberService.addMember(name, email, res, session);

            res.status(201).json({ member: addedMember });
        });
    }
}
