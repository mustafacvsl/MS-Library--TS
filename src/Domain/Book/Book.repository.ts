import Book from './Book';
import mongoose from 'mongoose';
import { injectable } from 'inversify';
import { errorHandlerMiddleware } from '../../middleware/errorhandlerMiddleware';
import { ClientSession } from 'mongoose';

@injectable()
class BookRepository {
    @errorHandlerMiddleware
    async createBook(bookData: { title: string; author: string; stock: string; location: { corridor: string; shelf: string; cupboard: string } }): Promise<any> {
        if (!bookData.author || !bookData.title) throw new Error('Author and title are required.');

        const newBook = await Book.create({
            author: bookData.author,
            title: bookData.title,
            stock: bookData.stock,
            location: bookData.location
        });
        return newBook;
    }

    async showBook(bookId: string): Promise<any> {
        if (!bookId) throw new Error('Book ID required.');

        return Book.findById(bookId).orFail(new Error('Book not found'));
    }

    @errorHandlerMiddleware
    async showAllBooks(): Promise<any> {
        return Book.find();
    }

    @errorHandlerMiddleware
    async updateBook(bookId: string, updatedBookInfo: any): Promise<any> {
        if (!bookId) {
            throw new Error('Book ID is required.');
        }

        return Book.findByIdAndUpdate(bookId, updatedBookInfo, { new: true }).orFail(new Error('Book not found'));
    }

    @errorHandlerMiddleware
    async deleteBook(bookId: string): Promise<any> {
        if (!bookId) {
            throw new Error('Book ID required.');
        }

        const book = await Book.findByIdAndDelete(bookId);

        if (!book) {
            throw new Error('Book not found');
        }

        return book;
    }
}

export default BookRepository;
