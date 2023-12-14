import BookRepository from './BookRepository';
import { inject, injectable } from 'inversify';
import { IBookModel } from './BookEntity';

@injectable()
export class BookService {
    private bookRepository: BookRepository;

    constructor(@inject(BookRepository) bookRepository: BookRepository) {
        this.bookRepository = bookRepository;
    }

    async createBook(bookData: string): Promise<IBookModel> {
        return this.bookRepository.createBook(bookData);
    }

    async updateBook(bookId: string, updates: any): Promise<IBookModel | null> {
        return this.bookRepository.updateBook(bookId, updates);
    }

    async deleteBook(bookId: string): Promise<IBookModel | null> {
        return this.bookRepository.deleteBook(bookId);
    }

    async getAllBooks(): Promise<IBookModel[]> {
        return this.bookRepository.getAllBooks();
    }
}

export default BookService;
