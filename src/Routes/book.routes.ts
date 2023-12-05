import express from 'express';
import { BookController } from '../Controller/book.controller';
import BookApplicationService from '../ApplicationService/BookApplicationService';
import BookService from '../Domain/Book/Book.service';
import BookRepository from '../Domain/Book/Book.repository';
import TransactionHandler from '../infrastructure/Transaction/TransactionManager';
import { Container } from 'inversify';
import StockRepository from '../Domain/BookStock/stockrepository';

const router = express.Router();
const transaction = new TransactionHandler();
const bookrepository = new BookRepository();
const stockrepository = new StockRepository();
const bookservice = new BookService(bookrepository);
const bookapplicationservice = new BookApplicationService(bookservice, transaction);
const bookController = new BookController(bookapplicationservice);

router.post('/create', bookController.createBook.bind(bookController));
router.patch('/update/:bookId', bookController.updateBook.bind(bookController));
router.delete('/delete/:bookId', bookController.deleteBook.bind(bookController));

router.get('/showAll', bookController.showAllBooks.bind(bookController));

export = router;
