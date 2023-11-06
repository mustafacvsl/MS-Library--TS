import Book from './Book';
import mongoose from 'mongoose';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import BookRepository from './Book.repository';
import { handleResponse } from '../../infrastructure/response';
import { Response, response } from 'express';

@injectable()
export class BookService {
    private bookRepository: BookRepository;

    constructor(@inject(BookRepository) bookRepository: BookRepository) {
        this.bookRepository = bookRepository;
    }

    async createBook(bookData: { author: string; title: string }): Promise<any> {
        if (!bookData.author || !bookData.title) {
            handleResponse(response, 400, null, 'Author and title are required.');
            return null;
        }

        const book = new Book({
            _id: new mongoose.Types.ObjectId(),
            author: bookData.author,
            title: bookData.title
        });

        const savedBook = await book.save();
        if (!savedBook) {
            handleResponse(response, 500, null, 'An error occurred while creating the book.');
            return null;
        }

        handleResponse(response, 201, { book: savedBook }, 'Book created successfully');
        return savedBook;
    }

    async readBook(bookId: string): Promise<any> {
        if (!bookId) {
            handleResponse(response, 400, null, 'Book ID required.');
            return null;
        }

        const book = await Book.findById(bookId).populate('author');
        if (!book) {
            handleResponse(response, 404, null, 'Book not found');
            return null;
        }

        handleResponse(response, 200, { book }, 'Book retrieved successfully');
        return book;
    }

    async readAllBooks(): Promise<any> {
        const books = await Book.find();
        handleResponse(response, 200, { books }, 'All books retrieved successfully');
        return books;
    }

    async updateBook(bookId: string, updatedBookInfo: any): Promise<any> {
        if (!bookId) {
            handleResponse(response, 400, null, 'Book ID required.');
            return null;
        }

        const book = await Book.findById(bookId);
        if (!book) {
            handleResponse(response, 404, null, 'Book not found');
            return null;
        }

        book.set(updatedBookInfo);
        const updatedBook = await book.save();

        if (!updatedBook) {
            handleResponse(response, 500, null, 'An error occurred while updating the book.');
            return null;
        }

        handleResponse(response, 200, { book: updatedBook }, 'Book updated successfully');
        return updatedBook;
    }

    async deleteBook(bookId: string): Promise<any> {
        if (!bookId) {
            handleResponse(response, 400, null, 'Book ID required.');
            return null;
        }

        const book = await Book.findByIdAndDelete(bookId);
        if (!book) {
            handleResponse(response, 404, null, 'Book not found');
            return null;
        }

        handleResponse(response, 200, { book }, 'Book deleted successfully');
        return book;
    }
}

export default BookService;
