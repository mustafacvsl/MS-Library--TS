import Book from './Book';
import mongoose from 'mongoose';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import BookRepository from './Book.repository';

@injectable()
export class BookService {
    private bookRepository: BookRepository;

    constructor(@inject(BookRepository) bookRepository: BookRepository) {
        this.bookRepository = bookRepository;
    }

    async createBook(bookData: { author: string; title: string }): Promise<any> {
        try {
            if (!bookData.author || !bookData.title) {
                throw new Error('Author and title are required.');
            }

            const book = new Book({
                _id: new mongoose.Types.ObjectId(),
                author: bookData.author,
                title: bookData.title
            });

            const savedBook = await book.save();
            if (!savedBook) {
                throw new Error('An error occurred while creating the book.');
            }

            return savedBook;
        } catch (error) {
            throw error;
        }
    }

    async readBook(bookId: string): Promise<any> {
        try {
            if (!bookId) {
                throw new Error('Book ID required.');
            }

            const book = await Book.findById(bookId).populate('author');
            if (!book) {
                throw new Error('Book not found');
            }

            return book;
        } catch (error) {
            throw error;
        }
    }

    async readAllBooks(): Promise<any> {
        try {
            const books = await Book.find();
            return books;
        } catch (error) {
            throw error;
        }
    }

    async updateBook(bookId: string, updatedBookInfo: any): Promise<any> {
        try {
            if (!bookId) {
                throw new Error('Book ID required.');
            }

            const book = await Book.findById(bookId);
            if (!book) {
                throw new Error('Book not found');
            }

            book.set(updatedBookInfo);
            const updatedBook = await book.save();

            if (!updatedBook) {
                throw new Error('An error occurred while updating the book.');
            }

            return updatedBook;
        } catch (error) {
            throw error;
        }
    }

    async deleteBook(bookId: string): Promise<any> {
        try {
            if (!bookId) {
                throw new Error('Book ID required.');
            }

            const book = await Book.findByIdAndDelete(bookId);
            if (!book) {
                throw new Error('Book not found');
            }

            return book;
        } catch (error) {
            throw error;
        }
    }
}

export default BookService;
