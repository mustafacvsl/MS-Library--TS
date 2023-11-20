import mongoose from 'mongoose';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import BookRepository from './Book.repository';
import { Response } from 'express';
import Book, { IBook } from './Book';
import { errorHandlerMiddleware } from '../../middleware/errorhandlerMiddleware';

@injectable()
export class BookService {
    private bookRepository: BookRepository;

    constructor(@inject(BookRepository) bookRepository: BookRepository) {
        this.bookRepository = bookRepository;
    }

    @errorHandlerMiddleware
    async createBook(bookData: { title: string; author: string; stock: string; location: string }, res: Response): Promise<IBook | null> {
        const book = new Book({
            _id: new mongoose.Types.ObjectId(),
            author: bookData.author,
            title: bookData.title,
            location: bookData.location,
            stock: bookData.stock
        });

        const savedBook = await book.save();
        if (!savedBook) {
            throw new Error('An error occurred while creating the book.');
        }

        return savedBook;
    }

    @errorHandlerMiddleware
    async showBook(bookId: string, res: Response): Promise<IBook | null> {
        if (!bookId) {
            throw new Error('Book ID required.');
        }

        return Book.findById(bookId);
    }

    @errorHandlerMiddleware
    async showAllBooks(res: Response): Promise<IBook[] | null> {
        return Book.find();
    }

    @errorHandlerMiddleware
    async updateBook(bookId: string, updatedBookInfo: any, res: Response): Promise<IBook | null> {
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
    }

    @errorHandlerMiddleware
    async deleteBook(bookId: string, res: Response): Promise<IBook | null> {
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

export default BookService;
