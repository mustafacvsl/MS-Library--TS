import { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import BookApplicationService from '../applicationService/BookApplicationService';

@injectable()
export class BookController {
    private bookApplicationservice: BookApplicationService;

    constructor(@inject(BookApplicationService) bookApplicationservice: BookApplicationService) {
        this.bookApplicationservice = bookApplicationservice;
    }

    createBook = async (req: Request, res: Response, next: NextFunction) => {
        const { title, author, stock, location } = req.body;

        if (!title || !author || !stock || !location) {
            return res.status(400).json({ error: 'Title, author, stock, and location are required.' });
        }

        try {
            const newBook = await this.bookApplicationservice.createBook({
                author,
                title,
                stock,
                location
            });
            res.status(201).json({ book: newBook });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    };

    readBook = async (req: Request, res: Response, next: NextFunction) => {
        const bookId = req.params.bookId;

        try {
            const book = await this.bookApplicationservice.getBook(bookId);
            res.status(200).json({ book });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    };

    readAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const books = await this.bookApplicationservice.getAllBooks();
            res.status(200).json({ books });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    };

    updateBook = async (req: Request, res: Response, next: NextFunction) => {
        const bookId = req.params.bookId;
        const updatedBookInfo = req.body;

        try {
            const updatedBook = await this.bookApplicationservice.updateBook(bookId, updatedBookInfo);
            res.status(201).json({ book: updatedBook });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    };

    deleteBook = async (req: Request, res: Response, next: NextFunction) => {
        const bookId = req.params.bookId;

        try {
            const deletedBook = await this.bookApplicationservice.deleteBook(bookId);
            res.status(201).json({ book: deletedBook, message: 'Silindi' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    };
}
export default BookController;
