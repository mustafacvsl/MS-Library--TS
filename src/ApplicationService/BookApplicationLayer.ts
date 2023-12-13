import BookService from '../Domain/Book/BookService';
import Book, { IBook } from '../Domain/Book/BookEntity';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Response } from 'express';
import { errorHandlerMiddleware } from '../middleware/ErrorHandlerMiddleware';
import TransactionHandler from '../middleware/TransactionManager';
import { TransactionMiddleware } from '../middleware/TransactionMiddleware';

@injectable()
export class BookApplicationService {
    private bookService: BookService;
    private transactionHandler: TransactionHandler;

    constructor(@inject(BookService) bookService: BookService, @inject(TransactionHandler) transactionHandler: TransactionHandler) {
        this.bookService = bookService;
        this.transactionHandler = transactionHandler;
    }

    @errorHandlerMiddleware
    @TransactionMiddleware
    async createBook(bookData: any, res: Response): Promise<any> {
        const createdBook = await this.bookService.createBook(bookData, res);
        console.log(bookData);
        return createdBook;
    }

    @errorHandlerMiddleware
    async getAllBooks(res: Response): Promise<any> {
        const books = await this.bookService.getAllBooks(res);
        return books;
    }

    @errorHandlerMiddleware
    @TransactionMiddleware
    async updateBook(bookId: string, updatedData: any, res: Response): Promise<any> {
        const updatedBook = await this.bookService.updateBook(bookId, updatedData, res);
        return updatedBook;
    }

    @errorHandlerMiddleware
    @TransactionMiddleware
    async deleteBook(bookId: string, res: Response): Promise<void> {
        await this.bookService.deleteBook(bookId, res);
    }
}

export default BookApplicationService;
