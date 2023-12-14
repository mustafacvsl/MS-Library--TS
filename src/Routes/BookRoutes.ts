import express from 'express';
import { BookController } from '../Controller/BookController';
import { container } from '../infrastructure/İnversify';
import { errorHandlerMiddleware } from '../middleware/ErrorHandlerMiddleware';
import { transactionMiddleware } from '../middleware/TransactionMiddleware';
import { JoiMiddleware, Schema } from '../middleware/JoiMiddleware';

const router = express.Router();

const bookController = container.resolve<BookController>(BookController);

router.post('/create', JoiMiddleware(Schema.createBook), errorHandlerMiddleware, transactionMiddleware, bookController.createBook.bind(bookController));
router.patch('/update/:bookId', errorHandlerMiddleware, transactionMiddleware, bookController.updateBook.bind(bookController));
router.delete('/delete/:bookId', errorHandlerMiddleware, transactionMiddleware, bookController.deleteBook.bind(bookController));
router.get('/showAll', errorHandlerMiddleware, bookController.getAllBooks.bind(bookController));

export = router;
