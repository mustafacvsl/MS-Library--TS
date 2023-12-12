import express from 'express';
import { BookController } from '../Controller/BookController';
import BookApplicationService from '../ApplicationService/BookApplicationLayer';
import BookService from '../Domain/Book/BookService';
import BookRepository from '../Domain/Book/BookRepository';
import TransactionHandler from '../middleware/TransactionMiddleware';
import { Container } from 'inversify';
import StockRepository from '../Domain/BookStock/stockrepository';
import { JoiMiddleware, Schema } from '../middleware/JoiMiddleware';

const router = express.Router();
const transaction = new TransactionHandler();
const bookrepository = new BookRepository();
const stockrepository = new StockRepository();
const bookservice = new BookService(bookrepository);
const bookapplicationservice = new BookApplicationService(bookservice, transaction);
const bookController = new BookController(bookapplicationservice);

router.post('/create', JoiMiddleware(Schema.createBook), bookController.createBook.bind(bookController));
router.patch('/update/:bookId', bookController.updateBook.bind(bookController));
router.delete('/delete/:bookId', bookController.deleteBook.bind(bookController));

router.get('/showAll', bookController.showAllBooks.bind(bookController));

export = router;
