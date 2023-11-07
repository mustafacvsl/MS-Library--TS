import Book from './Book';
import mongoose from 'mongoose';
import { injectable } from 'inversify';

@injectable()
class BookRepository {
    async createBook(author: string, title: string, stock: number, location: string): Promise<any> {
        if (!author || !title) {
            throw new Error('Author and title are required.');
        }

        const newBook = new Book({
            _id: new mongoose.Types.ObjectId(),
            author,
            title,
            stock,
            location
        });

        await newBook.save();
        return newBook;
    }

    async readBook(bookId: string): Promise<any> {
        if (!bookId) {
            throw new Error('Book ID is required.'); //validation bak
        }

        const book = await Book.findById(bookId).populate('author');
        if (!book) {
            throw new Error('Book not found');
        }

        return book;
    }

    async readAllBooks(): Promise<any> {
        return Book.find();
    }

    async updateBook(bookId: string, updatedBookInfo: any): Promise<any> {
        if (!bookId) {
            throw new Error('Book ID is required.');
        }

        const updatedBook = await Book.findByIdAndUpdate(bookId, updatedBookInfo, { new: true });
        if (!updatedBook) {
            throw new Error('Book not found');
        }

        return updatedBook;
    }

    async deleteBook(bookId: string): Promise<any> {
        if (!bookId) {
            throw new Error('Book ID required.');
        }

        const deletedBook = await Book.findByIdAndDelete(bookId);
        if (!deletedBook) {
            throw new Error('Book not found');
        }

        return deletedBook;
    }
}

export default BookRepository;
