import BookService from '../Domain/Book/BookService';

import { inject, injectable } from 'inversify';

import { IBookModel } from '../Domain/Book/BookEntity';

@injectable()
export class BookApplicationService {
    private bookService: BookService;

    constructor(@inject(BookService) bookService: BookService) {
        this.bookService = bookService;
    }

    async createBook(bookData: string): Promise<IBookModel> {
        return this.bookService.createBook(bookData);
    }

    async updateBook(bookId: string, updates: any): Promise<IBookModel | null> {
        return this.bookService.updateBook(bookId, updates);
    }

    async deleteBook(bookId: string): Promise<IBookModel | null> {
        return this.bookService.deleteBook(bookId);
    }

    async getAllBooks(): Promise<IBookModel[]> {
        return this.bookService.getAllBooks();
    }
}

export default BookApplicationService;
