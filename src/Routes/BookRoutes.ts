import express from 'express';
import { BookController } from '../Controller/BookController';
import { container } from '../infrastructure/İnversify';

import { JoiMiddleware, Schema } from '../middleware/JoiMiddleware';

const router = express.Router();

const bookController = container.resolve<BookController>(BookController);

router.post('/create', JoiMiddleware(Schema.createBook), bookController.createBook.bind(bookController));
router.patch('/update/:bookId', bookController.updateBook.bind(bookController));
router.delete('/delete/:bookId', bookController.deleteBook.bind(bookController));

router.get('/showAll', bookController.showAllBooks.bind(bookController));

export = router;
