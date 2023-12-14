import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Response } from 'express';
import { errorHandlerMiddleware } from '../middleware/ErrorHandlerMiddleware';
import TransactionHandler from '../middleware/TransactionManager';
import ExecutiveService from '../Domain/Executive/ExecutiveService';

import AuthEntity, { IAuthorModel, IAuthor } from '../Domain/User/AuthEntity';

@injectable()
export class ExecutiveApplicationService {
    constructor(@inject(ExecutiveService) private executiveservice: ExecutiveService, @inject(TransactionHandler) private transactionHandler: TransactionHandler) {}

    async borrowBook(memberId: string, bookId: string, dueDate: Date): Promise<void> {
        return this.executiveservice.borrowBook(memberId, bookId, dueDate);
    }

    async listUsers(): Promise<IAuthorModel[]> {
        return this.executiveservice.listUsers();
    }

    async updateUser(userId: string, updateData: Partial<IAuthor>): Promise<IAuthorModel | null> {
        return this.executiveservice.updateUser(userId, updateData);
    }

    async deleteUser(userId: string): Promise<void> {
        return this.executiveservice.deleteUser(userId);
    }
}
