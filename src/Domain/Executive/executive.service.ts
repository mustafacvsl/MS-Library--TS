import { inject, injectable } from 'inversify';
import ExecutiveRepository from './executive.repository';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import Author, { IAuthorModel } from '../User/auth.entity';
import 'reflect-metadata';
import Book, { IBookModel, IBook } from '../Book/Book';
import loanedEntity, { ILoaned } from './Loaned/loaned.entity';

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

    async borrowBook(memberId: string, bookId: string): Promise<IBookModel | null> {
        const member = await Author.findById(memberId);
        const book = await Book.findById(bookId);

        if (!member || !book) {
            throw new Error('member or book not found');
        }

        if (book.stock.count <= 0) {
            throw new Error('Book is out of stock');
        }

        const borrowedBook = new loanedEntity({
            memberId: member,
            bookId: book
        });

        book.stock.count -= 1;
        await book.save();

        await borrowedBook.save();

        return book;
    }

    async returnBook(memberId: string, bookId: string): Promise<IBookModel | null> {
        const member = await Author.findById(memberId);
        const book = await Book.findById(bookId);

        if (!member || !book) {
            throw new Error('Member or book not found');
        }

        const borrowedBook = await Loaned.findOne({ memberId: member, bookId: book });

        if (!borrowedBook) {
            throw new Error('Book not borrowed by this member');
        }

        book.stock.count += 1;
        await book.save();

        await borrowedBook.remove();

        return book;
    }
}

export default ExecutiveService;
