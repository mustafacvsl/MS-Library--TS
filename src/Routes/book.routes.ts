import express from 'express';
import { BookController } from '../Controller/book.controller';
import BookApplicationService from '../ApplicationService/BookApplicationService';
import BookService from '../Domain/Book/Book.service';
import BookRepository from '../Domain/Book/Book.repository';

const bookRepository = new BookRepository();
const bookService = new BookService(bookRepository);
const bookApplicationservice = new BookApplicationService(bookService);
const bookController = new BookController(bookApplicationservice);

const router = express.Router();

router.post('/create', bookController.createBook.bind(bookController));
router.get('/get/:bookId', bookController.readBook.bind(bookController));
router.get('/get/', bookController.readAll.bind(bookController));
router.patch('/update/:bookId', bookController.updateBook.bind(bookController));
router.delete('/delete/:bookId', bookController.deleteBook.bind(bookController));

export = router;
