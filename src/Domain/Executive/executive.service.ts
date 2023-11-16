import { inject, injectable } from 'inversify';
import ExecutiveRepository from './executive.repository';
import authEntity, { IAuthorModel } from '../User/auth.entity';
import 'reflect-metadata';
import loanedEntity, { ILoanedModel } from '../Loaned/loaned.entity';
import { errorHandlerMiddleware } from '../../middleware/errorhandlerMiddleware';
import Book, { IBookModel } from '../Book/Book';
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
        const member = await authEntity.findById(memberId);
        const book = await Book.findById(bookId);

        if (!member || !book) {
            throw new Error('Member or book not found');
        }

        const loanedBook = await this.executiverepository.borrowBook(memberId, bookId);

        if (!loanedBook) {
            throw new Error('Unable to borrow book');
        }

        book.status = 'Borrowed';
        await book.save();

        return loanedBook;
    }

    @errorHandlerMiddleware
    async returnBook(loanId: string): Promise<ILoanedModel | null> {
        const loanedBook = await loanedEntity.findById(loanId);

        if (!loanedBook) {
            throw new Error('Loaned book not found');
        }

        const returnedBook = await this.executiverepository.returnBook(loanId);

        if (!returnedBook) {
            throw new Error('Unable to return book');
        }

        const book = await Book.findById(returnedBook.bookId);
        if (book) {
            book.status = 'Available';
            await book.save();
        }

        return returnedBook;
    }
}

export default ExecutiveService;
