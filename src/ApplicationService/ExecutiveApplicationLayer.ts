import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Response } from 'express';
import { errorHandlerMiddleware } from '../middleware/ErrorHandlerMiddleware';
import TransactionHandler from '../middleware/TransactionManager';
import ExecutiveService from '../Domain/Executive/ExecutiveService';
import { TransactionMiddleware } from '../middleware/TransactionMiddleware';

@injectable()
export class ExecutiveApplicationService {
    constructor(@inject(ExecutiveService) private executiveservice: ExecutiveService, @inject(TransactionHandler) private transactionHandler: TransactionHandler) {}

    @errorHandlerMiddleware
    @TransactionMiddleware
    async borrowBook(memberId: string, bookId: string, res: Response): Promise<void> {
        await this.executiveservice.borrowBook(memberId, bookId, res);
    }

    @errorHandlerMiddleware
    @TransactionMiddleware
    async updateUser(userId: string, updates: Partial<{ name: string; email: string; password: string }>, res: Response): Promise<void> {
        await this.executiveservice.updateUser(userId, updates, res);
    }

    @errorHandlerMiddleware
    @TransactionMiddleware
    async deleteUser(userId: string, res: Response): Promise<void> {
        await this.executiveservice.deleteUser(userId, res);
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
