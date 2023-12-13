import { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import BookApplicationService from '../ApplicationService/BookApplicationLayer';
import { handleResponse } from '../infrastructure/Response';

@injectable()
export class BookController {
    private bookApplicationservice: BookApplicationService;

    constructor(@inject(BookApplicationService) bookApplicationservice: BookApplicationService) {
        this.bookApplicationservice = bookApplicationservice;
    }

    createBook = async (req: Request, res: Response, next: NextFunction) => {
        const bookData = req.body;
        const createdBook = await this.bookApplicationservice.createBook(bookData, res);
        handleResponse(res, 201, { book: createdBook }, 'Book created successfully');
    };

    showAllBooks = async (req: Request, res: Response, next: NextFunction) => {
        const books = await this.bookApplicationservice.getAllBooks(res);
        handleResponse(res, 200, { books }, 'All books retrieved successfully');
    };

    updateBook = async (req: Request, res: Response, next: NextFunction) => {
        const bookId = req.params.id;
        const updatedData = req.body;

        const updatedBook = await this.bookApplicationservice.updateBook(bookId, updatedData, res);
        handleResponse(res, 200, { book: updatedBook }, 'Book updated successfully');
    };

    deleteBook = async (req: Request, res: Response, next: NextFunction) => {
        const bookId = req.params.id;

        await this.bookApplicationservice.deleteBook(bookId, res);
        handleResponse(res, 204, null, 'Book deleted successfully');
    };
}

export default BookController;
