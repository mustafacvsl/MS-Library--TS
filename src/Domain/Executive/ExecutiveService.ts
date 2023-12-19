import { inject, injectable } from 'inversify';
import { IAuthorModel, IAuthor } from '../User/AuthEntity';
import { ExecutiveRepository } from './ExecutiveRepository ';
import { IReturnedModel } from '../Returned/ReturnedEntity';

@injectable()
class ExecutiveService {
    constructor(@inject(ExecutiveRepository) private executiverepository: ExecutiveRepository) {}
    async borrowBook(memberId: string, bookId: string, dueDate: string): Promise<any> {
        const borrowedBook = await this.executiverepository.borrowBook(memberId, bookId, dueDate);

        return { borrowedBook };
    }

    async returnBook(loanedId: string, returnedDate: string): Promise<IReturnedModel | null> {
        return this.executiverepository.returnBook(loanedId, returnedDate);
    }

    async listUsers(): Promise<IAuthorModel[]> {
        return this.executiverepository.listUsers();
    }

    async updateUser(userId: string, updates: any): Promise<IAuthorModel | null> {
        return this.executiverepository.updateUser(userId, updates);
    }

    async deleteUser(userId: string): Promise<void> {
        return this.executiverepository.deleteUser(userId);
    }
}

export default ExecutiveService;
