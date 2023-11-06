import { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import BookApplicationService from '../ApplicationService/BookApplicationService';
import { handleResponse } from '../infrastructure/response';

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

        const newBook = await this.bookApplicationservice.createBook({
            title,
            author,
            stock,
            location
        });
        handleResponse(res, 201, { book: newBook }, 'Book created successfully');
    };

    readBook = async (req: Request, res: Response, next: NextFunction) => {
        const bookId = req.params.bookId;

        const book = await this.bookApplicationservice.getBook(bookId);
        handleResponse(res, 200, { book }, 'Book retrieved successfully');
    };

    readAll = async (req: Request, res: Response, next: NextFunction) => {
        const books = await this.bookApplicationservice.getAllBooks();
        handleResponse(res, 200, { books }, 'All books retrieved successfully');
    };

    updateBook = async (req: Request, res: Response, next: NextFunction) => {
        const bookId = req.params.bookId;
        const updatedBookInfo = req.body;

        const updatedBook = await this.bookApplicationservice.updateBook(bookId, updatedBookInfo);
        handleResponse(res, 201, { book: updatedBook }, 'Book updated successfully');
    };

    deleteBook = async (req: Request, res: Response, next: NextFunction) => {
        const bookId = req.params.bookId;

        const deletedBook = await this.bookApplicationservice.deleteBook(bookId);
        handleResponse(res, 201, { book: deletedBook }, 'Book deleted successfully');
    };
}

export default BookController;
