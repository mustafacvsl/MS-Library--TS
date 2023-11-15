import { inject, injectable } from 'inversify';
import ExecutiveRepository from './executive.repository';
import authEntity, { IAuthorModel } from '../User/auth.entity';
import 'reflect-metadata';
import loanedEntity, { ILoanedModel } from '../Loaned/loaned.entity';
import { errorHandlerMiddleware } from '../../middleware/errorhandlerMiddleware';
import Book, { IBook, IBookModel } from '../Book/Book';
import { handleResponse } from '../../infrastructure/response';

@injectable()
class ExecutiveService {
    constructor(@inject(ExecutiveRepository) private executiverepository: ExecutiveRepository) {}

    @errorHandlerMiddleware
    async listUsers(): Promise<IAuthorModel[]> {
        return this.executiverepository.getAllUsers();
    }

    @errorHandlerMiddleware
    async updateUser(authorId: string, updatedAuthorInfo: any): Promise<IAuthorModel> {
        const author = await this.executiverepository.findUserById(authorId);
        if (!author) {
            throw new Error('User not found');
        }

        author.set(updatedAuthorInfo);

        return author.save();
    }

    @errorHandlerMiddleware
    async deleteAuthor(authorId: string): Promise<IAuthorModel | null> {
        const author = await this.executiverepository.findUserById(authorId);
        if (!author) {
            return null;
        }

        return this.executiverepository.deleteUserById(authorId);
    }

    @errorHandlerMiddleware
    async borrowBook(memberId: string, bookId: string): Promise<ILoanedModel | null> {
        return this.executiverepository.borrowBook(memberId, bookId);
    }

    @errorHandlerMiddleware
    async returnBook(loanId: string): Promise<ILoanedModel | null> {
        return this.executiverepository.returnBook(loanId);
    }
}

export default ExecutiveService;
