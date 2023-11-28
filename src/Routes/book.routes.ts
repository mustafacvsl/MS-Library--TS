import express from 'express';
import { BookController } from '../Controller/book.controller';
import BookApplicationService from '../ApplicationService/BookApplicationService';
import BookService from '../Domain/Book/Book.service';
import BookRepository from '../Domain/Book/Book.repository';
import TransactionHandler from '../infrastructure/Transaction/TransactionManager';

const bookRepository = new BookRepository();
const bookService = new BookService(bookRepository);
const transactionhandler = new TransactionHandler();
const bookApplicationservice = new BookApplicationService(bookService, transactionhandler);
const bookController = new BookController(bookApplicationservice);
//inversify

const router = express.Router();

router.post('/create', bookController.createBook.bind(bookController));
router.patch('/update/:bookId', bookController.updateBook.bind(bookController));
router.delete('/delete/:bookId', bookController.deleteBook.bind(bookController));
router.get('/show/:bookId', bookController.showBook.bind(bookController));
router.get('/showAll', bookController.showAllBooks.bind(bookController));

export = router;
