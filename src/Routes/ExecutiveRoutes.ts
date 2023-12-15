import express from 'express';
import { JoiMiddleware, Schema } from '../middleware/JoiMiddleware';
import configureContainer from '../infrastructure/Inversify';
import { ExecutiveController } from '../Controller/ExecutiveController';
import { TransactionMiddleware } from '../middleware/TransactionMiddleware';
import { Container } from 'inversify';
const router = express.Router();

const container = new Container();
configureContainer(container);
const executivecontroller = container.resolve<ExecutiveController>(ExecutiveController);

router.post('/borrow-book', TransactionMiddleware, JoiMiddleware(Schema.borrowBook), executivecontroller.borrowBook.bind(executivecontroller));
router.post('/return-book', TransactionMiddleware, executivecontroller.returnBook.bind(executivecontroller));
router.patch('/update', TransactionMiddleware, JoiMiddleware(Schema.updateUser), executivecontroller.updateUser.bind(executivecontroller));
router.delete('/delete', TransactionMiddleware, JoiMiddleware(Schema.userId), executivecontroller.updateUser.bind(executivecontroller));
router.get('/get', executivecontroller.listUsers.bind(executivecontroller));
export = router;
