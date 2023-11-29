import express from 'express';
import { BookController } from '../Controller/book.controller';
import BookApplicationService from '../ApplicationService/BookApplicationService';
import BookService from '../Domain/Book/Book.service';
import BookRepository from '../Domain/Book/Book.repository';
import TransactionHandler from '../infrastructure/Transaction/TransactionManager';
import container from '../infrastructure/inversify';

const bookController = container.get<BookController>(BookController);
const bookapplicationservice = container.get<BookApplicationService>(BookApplicationService);
const bookservice = container.get<BookService>(BookService);
const bookrepo = container.get<BookRepository>(BookRepository);
const transactionHandler = container.get<TransactionHandler>(TransactionHandler);

const router = express.Router();

router.post('/create', bookController.createBook.bind(bookController));
router.patch('/update/:bookId', bookController.updateBook.bind(bookController));
router.delete('/delete/:bookId', bookController.deleteBook.bind(bookController));

router.get('/showAll', bookController.showAllBooks.bind(bookController));

export = router;
