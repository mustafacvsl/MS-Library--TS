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
    async listUsers(res: Response) {
        return this.transactionHandler.runInTransaction(async (session) => {
            return this.executiveservice.listUsers();
        });
    }

    @errorHandlerMiddleware
    async updateAuthor(authorId: string, updateData: any, res: Response) {
        return this.transactionHandler.runInTransaction(async (session) => {
            return this.executiveservice.updateAuthor(authorId, updateData);
        });
    }

    @errorHandlerMiddleware
    async deleteAuthor(authorId: string, res: Response) {
        return this.transactionHandler.runInTransaction(async (session) => {
            return this.executiveservice.deleteAuthor(authorId);
        });
    }

    @errorHandlerMiddleware
    async borrowBook(memberId: string, bookId: string, res: Response) {
        return this.transactionHandler.runInTransaction(async (session) => {
            return this.executiveservice.borrowBook(memberId, bookId, session);
        });
    }

    @errorHandlerMiddleware
    async returnBook(loanId: string, res: Response) {
        return this.transactionHandler.runInTransaction(async (session) => {
            return this.executiveservice.returnBook(loanId, session);
        });
    }
}
