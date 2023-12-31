import express from 'express';
import { BookController } from '../Controller/BookController';
import configureContainer from '../infrastructure/Inversify';
import { TransactionMiddleware } from '../middleware/TransactionMiddleware';
import { ValidationMiddleware, Schema } from '../middleware/ValidationMiddleware';
import { Container } from 'inversify';

const router = express.Router();

const container = new Container();
configureContainer(container);

const bookController = container.resolve<BookController>(BookController);

router.post('/create', ValidationMiddleware(Schema.createBook), TransactionMiddleware, bookController.createBook.bind(bookController));
router.patch('/update/:bookId', TransactionMiddleware, bookController.updateBook.bind(bookController));
router.delete('/delete/:bookId', TransactionMiddleware, bookController.deleteBook.bind(bookController));
router.get('/showAll', bookController.getAllBooks.bind(bookController));

export = router;
