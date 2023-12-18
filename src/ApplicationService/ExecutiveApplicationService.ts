import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import ExecutiveService from '../Domain/Executive/ExecutiveService';
import AuthEntity, { IAuthorModel, IAuthor } from '../Domain/User/AuthEntity';
import LoanedEntity, { ILoanedModel } from '../Domain/Loaned/LoanedEntity';
import ReturnedEntity, { IReturnedModel } from '../Domain/Returned/ReturnedEntity';

@injectable()
export class ExecutiveApplicationService {
    constructor(@inject(ExecutiveService) private executiveservice: ExecutiveService) {}

    async borrowBook(memberId: string, bookId: string, dueDate: string): Promise<ILoanedModel | null> {
        return this.executiveservice.borrowBook(memberId, bookId, dueDate);
    }

    async returnBook(loanedId: string, returnedDate: string): Promise<IReturnedModel | null> {
        const returnedBook = await this.executiveservice.returnBook(loanedId, returnedDate);
        return returnedBook;
    }

    async listUsers(): Promise<IAuthorModel[]> {
        return this.executiveservice.listUsers();
    }

    async updateUser(userId: string, updates: any): Promise<IAuthorModel | null> {
        const updatedBook: IAuthorModel | null = await this.executiveservice.updateUser(userId, updates);
        return updatedBook;
    }

    async deleteUser(userId: string): Promise<void> {
        return this.executiveservice.deleteUser(userId);
    }
}
