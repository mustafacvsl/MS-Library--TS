import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import BookApplicationService from '../ApplicationService/BookApplicationLayer';
import { handleResponse } from '../infrastructure/Response';
import { errorHandlerMiddleware } from '../middleware/ErrorHandlerMiddleware';

@injectable()
export class BookController {
    private bookApplicationservice: BookApplicationService;

    constructor(@inject(BookApplicationService) bookApplicationservice: BookApplicationService) {
        this.bookApplicationservice = bookApplicationservice;
    }

    createBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const bookData: string = req.body;
        const createdBook: any = await this.bookApplicationservice.createBook(bookData);
        handleResponse(res, 201, { book: createdBook }, 'Book created successfully');
    };

    updateBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { bookId } = req.params;
        const updates: any = req.body;
        const updatedBook: any = await this.bookApplicationservice.updateBook(bookId, updates);
        handleResponse(res, 200, { book: updatedBook }, 'Book updated successfully');
    };

    deleteBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { bookId } = req.params;
        const deletedBook: any = await this.bookApplicationservice.deleteBook(bookId);
        handleResponse(res, 200, { book: deletedBook }, 'Book deleted successfully');
    };

    getAllBooks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const allBooks: any = await this.bookApplicationservice.getAllBooks();
        handleResponse(res, 200, { books: allBooks }, 'All books retrieved successfully');
    };
}

export default BookController;
