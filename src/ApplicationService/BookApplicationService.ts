import BookService from '../Domain/Book/Book.service';
import Book, { IBook } from '../Domain/Book/Book';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Response } from 'express';
import { errorHandlerMiddleware } from '../middleware/errorhandlerMiddleware';
import TransactionHandler from '../infrastructure/Transaction/TransactionManager';

@injectable()
export class BookApplicationService {
    private bookService: BookService;
    private transactionHandler: TransactionHandler;

    constructor(@inject(BookService) bookService: BookService, @inject(TransactionHandler) transactionHandler: TransactionHandler) {
        this.bookService = bookService;
        this.transactionHandler = transactionHandler;
    }

    @errorHandlerMiddleware
    async createBook(bookData: any, res: Response): Promise<any> {
        return this.transactionHandler.runInTransaction(async () => {
            const createdBook = await this.bookService.createBook(bookData, res);
            console.log(bookData);
            return createdBook;
        });
    }

    @errorHandlerMiddleware
    async getAllBooks(res: Response): Promise<any> {
        return this.transactionHandler.runInTransaction(async () => {
            const books = await this.bookService.getAllBooks(res);
            return books;
        });
    }

    @errorHandlerMiddleware
    async updateBook(bookId: string, updatedData: any, res: Response): Promise<any> {
        return this.transactionHandler.runInTransaction(async () => {
            const updatedBook = await this.bookService.updateBook(bookId, updatedData, res);
            return updatedBook;
        });
    }

    @errorHandlerMiddleware
    async deleteBook(bookId: string, res: Response): Promise<void> {
        return this.transactionHandler.runInTransaction(async () => {
            await this.bookService.deleteBook(bookId, res);
        });
    }
}

export default BookApplicationService;
