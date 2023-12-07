import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Response } from 'express';
import { errorHandlerMiddleware } from '../middleware/errorhandlerMiddleware';
import Joi from 'joi';
import TransactionHandler from '../infrastructure/Transaction/TransactionManager';
import ExecutiveService from '../Domain/Executive/executive.service';

@injectable()
export class ExecutiveApplicationService {
    constructor(@inject(ExecutiveService) private executiveservice: ExecutiveService, @inject(TransactionHandler) private transactionHandler: TransactionHandler) {}

    @errorHandlerMiddleware
    async borrowBook(memberId: string, bookId: string, res: Response): Promise<void> {
        return this.transactionHandler.runInTransaction(async (session) => {
            await this.executiveservice.borrowBook(memberId, bookId, res, session);
        });
    }
}
