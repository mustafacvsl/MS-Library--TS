import BookService from '../Domain/Book/Book.service';
import { IBook } from '../Domain/Book/Book';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';

@injectable()
export class BookApplicationService {
    private bookService: BookService;

    constructor(@inject(BookService) bookService: BookService) {
        this.bookService = bookService;
    }
    async createBook(bookData: { title: string; author: string; stock: string; location: string }): Promise<IBook | null> {
        try {
            if (!bookData.author || !bookData.title) {
                throw new Error('Author and title are required.');
            }

            const newBook = await this.bookService.createBook(bookData);
            return newBook;
        } catch (error) {
            throw error;
        }
    }

    async getBook(bookId: string): Promise<IBook | null> {
        try {
            const book = await this.bookService.readBook(bookId);
            if (!book) {
                throw new Error('Book not found');
            }
            return book;
        } catch (error) {
            throw error;
        }
    }

    async getAllBooks(): Promise<IBook[] | null> {
        try {
            const books = await this.bookService.readAllBooks();
            return books;
        } catch (error) {
            throw error;
        }
    }

    async updateBook(bookId: string, updatedBookInfo: any): Promise<IBook | null> {
        try {
            const updatedBook = await this.bookService.updateBook(bookId, updatedBookInfo);
            if (!updatedBook) {
                throw new Error(' Book not found');
            }
            return updatedBook;
        } catch (error) {
            throw error;
        }
    }

    async deleteBook(bookId: string): Promise<IBook | null> {
        try {
            const deletedBook = await this.bookService.deleteBook(bookId);
            if (!deletedBook) {
                throw new Error('Book not found');
            }
            return deletedBook;
        } catch (error) {
            throw error;
        }
    }
}

export default BookApplicationService;
