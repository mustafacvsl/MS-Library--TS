import mongoose from 'mongoose';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import BookRepository from './Book.repository';
import { errorHandlerMiddleware } from '../../middleware/errorhandlerMiddleware';
import { ClientSession } from 'mongoose';
import { Response } from 'express';

@injectable()
export class BookService {
    private bookRepository: BookRepository;

    constructor(@inject(BookRepository) bookRepository: BookRepository) {
        this.bookRepository = bookRepository;
    }

    @errorHandlerMiddleware
    async createBook(bookData: any, res: Response): Promise<any> {
        return this.bookRepository.createBook(bookData, res);
    }

    @errorHandlerMiddleware
    async updateBook(bookId: string, updatedData: any, res: Response): Promise<any> {
        return this.bookRepository.updateBook(bookId, updatedData, res);
    }

    @errorHandlerMiddleware
    async deleteBook(bookId: string, res: Response): Promise<void> {
        return this.bookRepository.deleteBook(bookId, res);
    }

    @errorHandlerMiddleware
    async getAllBooks(res: Response): Promise<any> {
        return this.bookRepository.getAllBooks(res);
    }
}

export default BookService;
