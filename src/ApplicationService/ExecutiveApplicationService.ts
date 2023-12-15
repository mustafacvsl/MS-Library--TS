import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import ExecutiveService from '../Domain/Executive/ExecutiveService';
import AuthEntity, { IAuthorModel, IAuthor } from '../Domain/User/AuthEntity';

@injectable()
export class ExecutiveApplicationService {
    constructor(@inject(ExecutiveService) private executiveservice: ExecutiveService) {}

    async borrowBook(memberId: string, bookId: string, dueDate: Date): Promise<void> {
        return this.executiveservice.borrowBook(memberId, bookId, dueDate);
    }

    async returnBook(loanedId: string): Promise<void> {
        return this.executiveservice.returnBook(loanedId);
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
