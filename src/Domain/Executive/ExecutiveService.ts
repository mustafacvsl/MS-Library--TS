import { inject, injectable } from 'inversify';
import { IAuthorModel, IAuthor } from '../User/AuthEntity';
import { ExecutiveRepository } from './ExecutiveRepository ';
import MemberEntity from '../Member/MemberEntity';
import BookEntity from '../Book/BookEntity';

@injectable()
class ExecutiveService {
    constructor(@inject(ExecutiveRepository) private executiverepository: ExecutiveRepository) {}

    async borrowBook(memberId: string, bookId: string, dueDate: Date): Promise<any> {
        const borrowedBook = await this.executiverepository.borrowBook(memberId, bookId, dueDate);
        const member = await MemberEntity.findById(memberId);
        const book = await BookEntity.findById(bookId);

        if (!member || !book) {
            throw new Error('Member or book not found');
        }

        return { borrowedBook, member, book };
    }
    async returnBook(loanedId: string): Promise<void> {
        return this.executiverepository.returnBook(loanedId);
    }

    async listUsers(): Promise<IAuthorModel[]> {
        return this.executiverepository.listUsers();
    }

    async updateUser(userId: string, updateData: Partial<IAuthor>): Promise<IAuthorModel | null> {
        return this.executiverepository.updateUser(userId, updateData);
    }

    async deleteUser(userId: string): Promise<void> {
        return this.executiverepository.deleteUser(userId);
    }
}

export default ExecutiveService;
