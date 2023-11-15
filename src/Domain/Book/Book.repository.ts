import Book from './Book';
import mongoose from 'mongoose';
import { injectable } from 'inversify';
import { errorHandlerMiddleware } from '../../middleware/errorhandlerMiddleware';

@injectable()
class BookRepository {
    @errorHandlerMiddleware
    async createBook(author: string, title: string, stock: number, location: string): Promise<any> {
        if (!author || !title) throw new Error('Author and title are required.');

        const newBook = await Book.create({ author, title, stock, location });
        return newBook;
    }

    @errorHandlerMiddleware
    async showBook(bookId: string): Promise<any> {
        if (!bookId) throw new Error('Book ID is required.');

        return Book.findById(bookId).populate('author').orFail(new Error('Book not found'));
    }

    @errorHandlerMiddleware
    async showAllBooks(): Promise<any> {
        return Book.find();
    }

    @errorHandlerMiddleware
    async updateBook(bookId: string, updatedBookInfo: any): Promise<any> {
        if (!bookId) throw new Error('Book ID is required.');

        return Book.findByIdAndUpdate(bookId, updatedBookInfo, { new: true }).orFail(new Error('Book not found'));
    }
    @errorHandlerMiddleware
    async deleteBook(bookId: string): Promise<any> {
        if (!bookId) throw new Error('Book ID required.');

        return Book.findByIdAndDelete(bookId).orFail(new Error('Book not found'));
    }
}

export default BookRepository;
