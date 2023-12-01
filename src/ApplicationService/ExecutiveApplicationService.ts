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
            const users = await this.executiveservice.listUsers();
            res.status(200).json({ users });
        });
    }

    @errorHandlerMiddleware
    async updateUsers(userId: string, data: any, res: Response) {
        return this.transactionHandler.runInTransaction(async (session) => {
            const updatedUser = await this.executiveservice.updateUsers(userId, data);
            res.status(200).json({ updatedUser });
        });
    }

    @errorHandlerMiddleware
    async deleteUsers(userId: string, res: Response) {
        return this.transactionHandler.runInTransaction(async (session) => {
            const deletedUser = await this.executiveservice.deleteUsers(userId);
            res.status(200).json({ deletedUser });
        });
    }

    @errorHandlerMiddleware
    async borrowBook(memberId: string, bookId: string, borrowedDate: Date, returnedDate: Date, res: Response) {
        return this.transactionHandler.runInTransaction(async (session) => {
            return this.executiveservice.borrowBook(memberId, bookId, borrowedDate, returnedDate, session);
        });
    }

    @errorHandlerMiddleware
    async returnBook(loanId: string, res: Response) {
        return this.transactionHandler.runInTransaction(async (session) => {
            return this.executiveservice.returnBook(loanId, session);
        });
    }
}
