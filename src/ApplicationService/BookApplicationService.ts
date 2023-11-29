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
    async createBook(bookData: { title: string; author: string; stock: string; location: { corridor: string; shelf: string; cupboard: string } }, res: Response): Promise<void | null> {
        return this.transactionHandler.runInTransaction(async (session) => {
            return this.bookService.createBook(bookData, res, session);
        });
    }

    @errorHandlerMiddleware
    async showAllBooks(res: Response): Promise<IBook[] | null> {
        return this.bookService.showAllBooks(res);
    }

    @errorHandlerMiddleware
    async updateBook(bookId: string, updatedBookInfo: any, res: Response): Promise<void | null> {
        return this.transactionHandler.runInTransaction(async (session) => {
            return this.bookService.updateBook(bookId, updatedBookInfo, res, session);
        });
    }

    @errorHandlerMiddleware
    async deleteBook(bookId: string, res: Response): Promise<void | null> {
        return this.transactionHandler.runInTransaction(async (session) => {
            return this.bookService.deleteBook(bookId, res, session);
        });
    }
}

export default BookApplicationService;
