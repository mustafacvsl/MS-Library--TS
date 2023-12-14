import express from 'express';
import { JoiMiddleware, Schema } from '../middleware/JoiMiddleware';
import { container } from '../infrastructure/İnversify';
import { ExecutiveController } from '../Controller/ExecutiveController';
import { errorHandlerMiddleware } from '../middleware/ErrorHandlerMiddleware';
import { transactionMiddleware } from '../middleware/TransactionMiddleware';
const router = express.Router();
const executivecontroller = container.resolve<ExecutiveController>(ExecutiveController);

router.post('/borrow-book', errorHandlerMiddleware, transactionMiddleware, JoiMiddleware(Schema.borrowBook), executivecontroller.borrowBook.bind(executivecontroller));
router.patch('/update', errorHandlerMiddleware, transactionMiddleware, JoiMiddleware(Schema.updateUser), executivecontroller.updateUser.bind(executivecontroller));
router.delete('/delete', errorHandlerMiddleware, transactionMiddleware, JoiMiddleware(Schema.userId), executivecontroller.updateUser.bind(executivecontroller));
router.get('/get', errorHandlerMiddleware, executivecontroller.listUsers.bind(executivecontroller));
export = router;
