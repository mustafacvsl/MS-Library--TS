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

    @errorHandlerMiddleware
    async returnBook(loanedId: string, res: Response): Promise<void> {
        return this.transactionHandler.runInTransaction(async (session) => {
            await this.executiveservice.returnBook(loanedId, res, session);
        });
    }

    @errorHandlerMiddleware
    async updateUser(userId: string, updates: Partial<{ name: string; email: string; password: string }>, res: Response): Promise<void> {
        return this.transactionHandler.runInTransaction(async (session) => {
            await this.executiveservice.updateUser(userId, updates, res);
        });
    }

    @errorHandlerMiddleware
    async deleteUser(userId: string, res: Response): Promise<void> {
        return this.transactionHandler.runInTransaction(async (session) => {
            await this.executiveservice.deleteUser(userId, res);
        });
    }

    @errorHandlerMiddleware
    async getAllUsers(res: Response): Promise<void> {
        await this.executiveservice.getAllUsers(res);
    }

    @errorHandlerMiddleware
    async getUserById(userId: string, res: Response): Promise<void> {
        await this.executiveservice.getUserById(userId, res);
    }
}
