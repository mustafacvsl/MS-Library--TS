import BookService from '../Domain/Book/BookService';
import TransactionHandler from '../middleware/TransactionManager';
import { inject, injectable } from 'inversify';
import { errorHandlerMiddleware } from '../middleware/ErrorHandlerMiddleware';
import { IBookModel } from '../Domain/Book/BookEntity';

@injectable()
export class BookApplicationService {
    private bookService: BookService;
    private transactionHandler: TransactionHandler;

    constructor(@inject(BookService) bookService: BookService, @inject(TransactionHandler) transactionHandler: TransactionHandler) {
        this.bookService = bookService;
        this.transactionHandler = transactionHandler;
    }

    async createBook(bookData: string): Promise<IBookModel> {
        const createdBook: IBookModel = await this.bookService.createBook(bookData);
        console.log(bookData);
        return createdBook;
    }

    async updateBook(bookId: string, updates: any): Promise<IBookModel | null> {
        const updatedBook: IBookModel | null = await this.bookService.updateBook(bookId, updates);
        return updatedBook;
    }

    async deleteBook(bookId: string): Promise<IBookModel | null> {
        const deletedBook: IBookModel | null = await this.bookService.deleteBook(bookId);
        return deletedBook;
    }

    async getAllBooks(): Promise<IBookModel[]> {
        return this.bookService.getAllBooks();
    }
}

export default BookApplicationService;
