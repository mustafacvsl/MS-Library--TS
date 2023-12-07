import Book from './Book';
import mongoose from 'mongoose';
import { injectable } from 'inversify';
import { errorHandlerMiddleware } from '../../middleware/errorhandlerMiddleware';
import { ClientSession } from 'mongoose';
import { handleResponse } from '../../infrastructure/response';
import { Response } from 'express';

@injectable()
class BookRepository {
    @errorHandlerMiddleware
    async createBook(bookData: any, res: Response): Promise<any> {
        const responseData = {
            status: 201,
            data: { ...bookData },
            message: 'Book created successfully'
        };

        handleResponse(res, responseData.status, responseData.data, responseData.message);

        if (typeof bookData.stock === 'object' && bookData.stock !== null) {
            bookData.stock = bookData.stock.count;
        }

        const newBook = new Book(bookData);

        return newBook.save();
    }

    async findById(bookId: string, session: ClientSession): Promise<any> {
        return Book.findById(bookId).session(session);
    }

    @errorHandlerMiddleware
    async getAllBooks(res: Response): Promise<any> {
        const books = await Book.find();

        const responseData = {
            status: 201,
            data: { ...books },
            message: 'Book listening successfully'
        };

        handleResponse(res, responseData.status, responseData.data, responseData.message);
        return books;
    }

    @errorHandlerMiddleware
    async updateBook(bookId: string, updatedData: any, res: Response): Promise<any> {
        const updatedBook = await Book.findByIdAndUpdate(bookId, updatedData, { new: true });

        const responseData = {
            status: 200,
            data: { ...updatedData },
            message: 'Book updated successfully'
        };

        handleResponse(res, responseData.status, responseData.data, responseData.message);
        return updatedBook;
    }

    @errorHandlerMiddleware
    async deleteBook(bookId: string, res: Response): Promise<void> {
        await Book.findByIdAndDelete(bookId);

        const responseData = {
            status: 204,
            data: null,
            message: 'Book deleted successfully'
        };

        handleResponse(res, responseData.status, responseData.data, responseData.message);
    }

    async updateBookStatus(bookId: string, status: string, session: ClientSession): Promise<void> {
        await Book.findByIdAndUpdate(bookId, { status }, { session });
    }
}

export default BookRepository;
