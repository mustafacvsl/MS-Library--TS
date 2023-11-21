import BookService from '../Domain/Book/Book.service';
import { IBook } from '../Domain/Book/Book';
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
    async createBook(bookData: { title: string; author: string; stock: string; location: string }, res: Response): Promise<void | null> {
        if (!bookData.title && !bookData.author && !bookData.stock && !bookData.location) {
            throw new Error('At least one of the fields (title, author, stock, location) is required.');
        }

        const locationObject = JSON.parse(bookData.location);

        await this.transactionHandler.runInTransaction(async (session) => {
            await this.bookService.createBook(
                {
                    title: bookData.title,
                    author: bookData.author,
                    stock: bookData.stock,
                    location: locationObject
                },
                res,
                session
            );
        });
    }

    @errorHandlerMiddleware
    async showBook(bookId: string, res: Response): Promise<IBook | null> {
        if (!bookId) {
            throw new Error('Book ID required.');
        }

        const book = await this.bookService.showBook(bookId, res);
        if (!book) {
            throw new Error('Book not found');
        }

        return book;
    }

    @errorHandlerMiddleware
    async showAllBooks(res: Response): Promise<IBook[] | null> {
        return this.bookService.showAllBooks(res);
    }
    @errorHandlerMiddleware
    async updateBook(bookId: string, updatedBookInfo: any, res: Response): Promise<void | null> {
        return this.transactionHandler.runInTransaction(async (session) => {
            const updatedBook = await this.bookService.updateBook(bookId, updatedBookInfo, res, session);
            if (!updatedBook) {
                throw new Error('Book not found');
            }

            return;
        });
    }

    @errorHandlerMiddleware
    async deleteBook(bookId: string, res: Response): Promise<void | null> {
        return this.transactionHandler.runInTransaction(async (session) => {
            const deletedBook = await this.bookService.deleteBook(bookId, res, session);
            if (!deletedBook) {
                throw new Error('Book not found');
            }
            return;
        });
    }
}

export default BookApplicationService;
