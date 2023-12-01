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
            const newBook = await this.bookService.createBook(bookData, res, session);

            if (newBook) {
                res.status(201).json({ book: newBook, message: 'Book created successfully' });
            } else {
                res.status(500).json({ message: 'Failed to create the book' });
            }
        });
    }

    @errorHandlerMiddleware
    async showAllBooks(res: Response): Promise<any> {
        return this.transactionHandler.runInTransaction(async () => {
            const allBooks = await this.bookService.showAllBooks();
            return allBooks;
        });
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
