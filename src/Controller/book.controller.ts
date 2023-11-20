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

        const locationString = JSON.stringify(location);

        const newBook = await this.bookApplicationservice.createBook(
            {
                title,
                author,
                stock,
                location: locationString
            },
            res
        );
        handleResponse(res, 201, { book: newBook }, 'Book created successfully');
    };

    showBook = async (req: Request, res: Response, next: NextFunction) => {
        const bookId = req.params.bookId;

        const book = await this.bookApplicationservice.showBook(bookId, res);
        handleResponse(res, 200, { book }, 'Book retrieved successfully');
    };

    showAllBooks = async (req: Request, res: Response, next: NextFunction) => {
        const books = await this.bookApplicationservice.showAllBooks(res);
        handleResponse(res, 200, { books }, 'All books retrieved successfully');
    };
    updateBook = async (req: Request, res: Response, next: NextFunction) => {
        const bookId = req.params.bookId;
        const updatedBookInfo = req.body;

        const updatedBook = await this.bookApplicationservice.updateBook(bookId, updatedBookInfo, res);
        handleResponse(res, 201, { book: updatedBook }, 'Book updated successfully');
    };

    deleteBook = async (req: Request, res: Response, next: NextFunction) => {
        const bookId = req.params.bookId;

        const deletedBook = await this.bookApplicationservice.deleteBook(bookId, res);
        handleResponse(res, 201, { book: deletedBook }, 'Book deleted successfully');
    };
}

export default BookController;
