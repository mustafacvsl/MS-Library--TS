import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { errorHandlerMiddleware } from '../middleware/ErrorHandlerMiddleware';
import { Response } from 'express';
import TransactionHandler from '../middleware/TransactionManager';
import MemberService from '../Domain/Member/MemberService';
import { TransactionMiddleware } from '../middleware/TransactionMiddleware';

@injectable()
export class MemberApplicationService {
    constructor(@inject(MemberService) private memberService: MemberService, @inject(TransactionHandler) private transactionHandler: TransactionHandler) {}

    @errorHandlerMiddleware
    @TransactionMiddleware
    async addMember(name: string, email: string, res: Response): Promise<void> {
        const addedMember = await this.memberService.addMember(name, email, res);

        res.status(201).json({ member: addedMember });
    }
}
