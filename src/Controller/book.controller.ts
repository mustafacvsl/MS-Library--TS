import { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import BookApplicationService from '../ApplicationService/BookApplicationService';
import { handleResponse } from '../infrastructure/response';
import { errorHandlerMiddleware } from '../middleware/errorhandlerMiddleware';

@injectable()
export class BookController {
    private bookApplicationservice: BookApplicationService;

    constructor(@inject(BookApplicationService) bookApplicationservice: BookApplicationService) {
        this.bookApplicationservice = bookApplicationservice;
    }

    createBook = async (req: Request, res: Response, next: NextFunction) => {
        const { title, author, stock, location } = req.body;

        if (!title || !author || !stock || !location) {
            return next(new Error('Title, author, stock, and location are required.'));
        }

        const newBook = await this.bookApplicationservice.createBook(
            {
                title,
                author,
                stock,
                location
            },
            res
        );
        handleResponse(res, 201, { book: newBook }, 'Book created successfully');
    };

    showAllBooks = async (req: Request, res: Response, next: NextFunction) => {
        const books = await this.bookApplicationservice.showAllBooks(res);
        handleResponse(res, 200, { books }, 'Books retrieved successfully');
    };

    updateBook = async (req: Request, res: Response, next: NextFunction) => {
        const { bookId } = req.params;
        const updatedData = req.body;
        await this.bookApplicationservice.updateBook(bookId, updatedData, res);
        handleResponse(res, 200, null, 'Book updated successfully');
    };

    deleteBook = async (req: Request, res: Response, next: NextFunction) => {
        const { bookId } = req.params;
        await this.bookApplicationservice.deleteBook(bookId, res);
        handleResponse(res, 204, null, 'Book deleted successfully');
    };
}

export default BookController;
