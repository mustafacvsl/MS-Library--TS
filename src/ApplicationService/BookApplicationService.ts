import BookService from '../Domain/Book/Book.service';
import { IBook } from '../Domain/Book/Book';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Response } from 'express';
import { errorHandlerMiddleware } from '../middleware/errorhandlerMiddleware';

@injectable()
export class BookApplicationService {
    private bookService: BookService;

    constructor(@inject(BookService) bookService: BookService) {
        this.bookService = bookService;
    }

    @errorHandlerMiddleware
    async createBook(bookData: { title: string; author: string; stock: string; location: string }, res: Response): Promise<IBook | null> {
        if (!bookData.title && !bookData.author && !bookData.stock && !bookData.location) {
            throw new Error('At least one of the fields (title, author, stock, location) is required.');
        }

        const locationObject = JSON.parse(bookData.location);
        return this.bookService.createBook(
            {
                title: bookData.title,
                author: bookData.author,
                stock: bookData.stock,
                location: locationObject
            },
            res
        );
    }

    @errorHandlerMiddleware
    async getBook(bookId: string, res: Response): Promise<IBook | null> {
        const book = await this.bookService.showBook(bookId, res);
        if (!book) {
            throw new Error('Book not found');
        }
        return book;
    }

    @errorHandlerMiddleware
    async getAllBooks(res: Response): Promise<IBook[] | null> {
        const books = await this.bookService.showAllBooks(res);
        return books;
    }

    @errorHandlerMiddleware
    async updateBook(bookId: string, updatedBookInfo: any, res: Response): Promise<IBook | null> {
        const updatedBook = await this.bookService.updateBook(bookId, updatedBookInfo, res);
        if (!updatedBook) {
            throw new Error('Book not found');
        }
        return updatedBook;
    }

    @errorHandlerMiddleware
    async deleteBook(bookId: string, res: Response): Promise<IBook | null> {
        const deletedBook = await this.bookService.deleteBook(bookId, res);
        if (!deletedBook) {
            throw new Error('Book not found');
        }
        return deletedBook;
    }
}

export default BookApplicationService;
