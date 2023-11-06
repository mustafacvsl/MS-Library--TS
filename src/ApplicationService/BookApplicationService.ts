import BookService from '../Domain/Book/Book.service';
import { IBook } from '../Domain/Book/Book';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { handleResponse } from '../infrastructure/response';
import { Response, response } from 'express';

@injectable()
export class BookApplicationService {
    private bookService: BookService;

    constructor(@inject(BookService) bookService: BookService) {
        this.bookService = bookService;
    }

    async createBook(bookData: { title: string; author: string; stock: string; location: string }): Promise<IBook | null> {
        if (!bookData.author || !bookData.title) {
            handleResponse(response, 400, null, 'Author and title are required.');
            return null;
        }

        const newBook = await this.bookService.createBook(bookData);
        handleResponse(response, 201, { book: newBook }, 'Book created successfully');
        return newBook;
    }

    async getBook(bookId: string): Promise<IBook | null> {
        const book = await this.bookService.readBook(bookId);
        if (!book) {
            handleResponse(response, 404, null, 'Book not found');
            return null;
        }
        handleResponse(response, 200, { book }, 'Book retrieved successfully');
        return book;
    }

    async getAllBooks(): Promise<IBook[] | null> {
        const books = await this.bookService.readAllBooks();
        handleResponse(response, 200, { books }, 'All books retrieved successfully');
        return books;
    }

    async updateBook(bookId: string, updatedBookInfo: any): Promise<IBook | null> {
        const updatedBook = await this.bookService.updateBook(bookId, updatedBookInfo);
        if (!updatedBook) {
            handleResponse(response, 404, null, 'Book not found');
            return null;
        }
        handleResponse(response, 200, { book: updatedBook }, 'Book updated successfully');
        return updatedBook;
    }

    async deleteBook(bookId: string): Promise<IBook | null> {
        const deletedBook = await this.bookService.deleteBook(bookId);
        if (!deletedBook) {
            handleResponse(response, 404, null, 'Book not found');
            return null;
        }
        handleResponse(response, 200, { book: deletedBook }, 'Book deleted successfully');
        return deletedBook;
    }
}

export default BookApplicationService;
