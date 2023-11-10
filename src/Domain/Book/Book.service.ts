import mongoose from 'mongoose';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import BookRepository from './Book.repository';
import { Response } from 'express';
import { handleResponse } from '../../infrastructure/response';
import Book, { IBook } from './Book';
import { errorHandler } from '../../middleware/errorhandlerMiddleware';

@injectable()
export class BookService {
    private bookRepository: BookRepository;

    constructor(@inject(BookRepository) bookRepository: BookRepository) {
        this.bookRepository = bookRepository;
    }

    @errorHandler()
    async createBook(bookData: { title: string; author: string; stock: string; location: string }, res: Response): Promise<IBook | null> {
        if (!bookData.author || !bookData.title || !bookData.location || !bookData.stock) {
            handleResponse(res, 400, null, 'Author, title, location, and stock are required.');
            return null;
        }

        const book = new Book({
            _id: new mongoose.Types.ObjectId(),
            author: bookData.author,
            title: bookData.title,
            location: bookData.location,
            stock: bookData.stock
        });

        const savedBook = await book.save();
        if (!savedBook) {
            handleResponse(res, 500, null, 'An error occurred while creating the book.');
            return null;
        }

        handleResponse(res, 201, { book: savedBook }, 'Book created successfully');
        return savedBook;
    }

    @errorHandler()
    async readBook(bookId: string, res: Response): Promise<any> {
        if (!bookId) {
            handleResponse(res, 400, null, 'Book ID required.');
            return null;
        }

        const book = await Book.findById(bookId).populate('author');
        if (!book) {
            handleResponse(res, 404, null, 'Book not found');
            return null;
        }

        handleResponse(res, 200, { book }, 'Book retrieved successfully');
        return book;
    }

    async readAllBooks(res: Response): Promise<any> {
        const books = await Book.find();
        handleResponse(res, 200, { books }, 'All books retrieved successfully');
        return books;
    }

    @errorHandler()
    async updateBook(bookId: string, updatedBookInfo: any, res: Response): Promise<any> {
        if (!bookId) {
            handleResponse(res, 400, null, 'Book ID required.');
            return null;
        }

        const book = await Book.findById(bookId);
        if (!book) {
            handleResponse(res, 404, null, 'Book not found');
            return null;
        }

        book.set(updatedBookInfo);
        const updatedBook = await book.save();

        if (!updatedBook) {
            handleResponse(res, 500, null, 'An error occurred while updating the book.');
            return null;
        }

        handleResponse(res, 200, { book: updatedBook }, 'Book updated successfully');
        return updatedBook;
    }

    @errorHandler()
    async deleteBook(bookId: string, res: Response): Promise<any> {
        if (!bookId) {
            handleResponse(res, 400, null, 'Book ID required.');
            return null;
        }

        const book = await Book.findByIdAndDelete(bookId);
        if (!book) {
            handleResponse(res, 404, null, 'Book not found');
            return null;
        }

        handleResponse(res, 200, { book }, 'Book deleted successfully');
        return book;
    }
}

export default BookService;
