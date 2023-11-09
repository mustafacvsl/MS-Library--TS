import { inject, injectable } from 'inversify';
import ExecutiveRepository from './executive.repository';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import authEntity, { IAuthorModel } from '../User/auth.entity';
import 'reflect-metadata';
import loanedEntity, { ILoanedModel } from '../Loaned/loaned.entity';
import Book, { IBook, IBookModel } from '../Book/Book';

@injectable()
class ExecutiveService {
    constructor(@inject(ExecutiveRepository) private executiverepository: ExecutiveRepository) {}

    async listUsers(): Promise<IAuthorModel[]> {
        const users = await this.executiverepository.getAllUsers();
        return users;
    }

    async updateUser(authorId: string, updatedAuthorInfo: any): Promise<IAuthorModel> {
        const author = await this.executiverepository.findUserById(authorId);
        if (!author) {
            throw new Error('User not found');
        }

        author.set(updatedAuthorInfo);

        try {
            const updatedAuthor = await author.save();
            return updatedAuthor;
        } catch (error) {
            throw error;
        }
    }

    async deleteAuthor(authorId: string): Promise<IAuthorModel | null> {
        const author = await this.executiverepository.findUserById(authorId);
        if (!author) {
            return null;
        }

        try {
            const deletedAuthor = await this.executiverepository.deleteUserById(authorId);
            return deletedAuthor;
        } catch (error) {
            throw error;
        }
    }

    async borrowBook(memberId: string, bookId: string): Promise<ILoanedModel | null> {
        const loanedBook = await this.executiverepository.borrowBook(memberId, bookId);
        return loanedBook;
    }

    async returnBook(loanId: string): Promise<ILoanedModel | null> {
        const returnedBook = await this.executiverepository.returnBook(loanId);
        return returnedBook;
    }
}

export default ExecutiveService;
