import BookService from '../Domain/Book/Book.service';
import { IBook } from '../Domain/Book/Book';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { handleResponse } from '../infrastructure/response';
import { Response } from 'express';

@injectable()
export class BookApplicationService {
    private bookService: BookService;

    constructor(@inject(BookService) bookService: BookService) {
        this.bookService = bookService;
    }

    async createBook(bookData: { title: string; author: string; stock: string; location: string }, res: Response): Promise<IBook | null> {
        if (!bookData.author || !bookData.title || !bookData.location || !bookData.stock) {
            handleResponse(res, 400, null, 'Author, title, location, and stock are required.');
            return null;
        }

        const locationObject = JSON.parse(bookData.location);
        const newBook = await this.bookService.createBook(
            {
                title: bookData.title,
                author: bookData.author,
                stock: bookData.stock,
                location: locationObject
            },
            res
        );
        handleResponse(res, 201, { book: newBook }, 'Book created successfully');
        return newBook;
    }

    async getBook(bookId: string, res: Response): Promise<IBook | null> {
        const book = await this.bookService.readBook(bookId, res);
        if (!book) {
            handleResponse(res, 404, null, 'Book not found');
            return null;
        }
        handleResponse(res, 200, { book }, 'Book retrieved successfully');
        return book;
    }

    async getAllBooks(res: Response): Promise<IBook[] | null> {
        const books = await this.bookService.readAllBooks(res);
        handleResponse(res, 200, { books }, 'All books retrieved successfully');
        return books;
    }

    async updateBook(bookId: string, updatedBookInfo: any, res: Response): Promise<IBook | null> {
        const updatedBook = await this.bookService.updateBook(bookId, updatedBookInfo, res);
        if (!updatedBook) {
            handleResponse(res, 404, null, 'Book not found');
            return null;
        }
        handleResponse(res, 200, { book: updatedBook }, 'Book updated successfully');
        return updatedBook;
    }

    async deleteBook(bookId: string, res: Response): Promise<IBook | null> {
        const deletedBook = await this.bookService.deleteBook(bookId, res);
        if (!deletedBook) {
            handleResponse(res, 404, null, 'Book not found');
            return null;
        }
        handleResponse(res, 200, { book: deletedBook }, 'Book deleted successfully');
        return deletedBook;
    }
}

export default BookApplicationService;
