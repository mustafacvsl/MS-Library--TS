import mongoose from 'mongoose';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import BookRepository from './Book.repository';
import { Response } from 'express';
import { errorHandlerMiddleware } from '../../middleware/errorhandlerMiddleware';
import { ClientSession } from 'mongoose';

@injectable()
export class BookService {
    private bookRepository: BookRepository;

    constructor(@inject(BookRepository) bookRepository: BookRepository) {
        this.bookRepository = bookRepository;
    }

    @errorHandlerMiddleware
    async createBook(
        bookData: { title: string; author: string; stock: string; location: { corridor: string; shelf: string; cupboard: string } },
        res: Response,
        session?: ClientSession
    ): Promise<any> {
        return this.bookRepository.createBook(bookData);
    }

    @errorHandlerMiddleware
    async showAllBooks(): Promise<any> {
        return this.bookRepository.showAllBooks();
    }

    @errorHandlerMiddleware
    async updateBook(bookId: string, updatedBookInfo: any, res: Response, session: ClientSession | null = null): Promise<any> {
        if (!bookId) {
            throw new Error('Book ID is required.');
        }
        return this.bookRepository.updateBook(bookId, updatedBookInfo);
    }

    @errorHandlerMiddleware
    async deleteBook(bookId: string, res: Response, session: ClientSession | null = null): Promise<any> {
        if (!bookId) {
            throw new Error('Book ID required.');
        }
        return this.bookRepository.deleteBook(bookId);
    }
}

export default BookService;
