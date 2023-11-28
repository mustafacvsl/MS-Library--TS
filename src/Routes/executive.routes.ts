import express from 'express';
import { ExecutiveController } from '../Controller/executive.controller';
import { Schemas, JoiMiddleware } from '../middleware/JoiMiddleware';
import { ExecutiveApplicationService } from '../ApplicationService/ExecutiveApplicationService';
import ExecutiveService from '../Domain/Executive/executive.service';
import ExecutiveRepository from '../Domain/Executive/executive.repository';
import TransactionHandler from '../infrastructure/Transaction/TransactionManager';

const router = express.Router();
const executiverepository = new ExecutiveRepository();
const executiveservice = new ExecutiveService(executiverepository);
const transactionhandler = new TransactionHandler();
const executiveapplicationservice = new ExecutiveApplicationService(executiveservice, transactionhandler);
const executivecontroller = new ExecutiveController(executiveapplicationservice);

router.get('/list', executivecontroller.listUsers.bind(executivecontroller));
router.patch('/update/:authorId', JoiMiddleware(Schemas.author.update), executivecontroller.updateAuthor.bind(executivecontroller));
router.delete('/delete/:authorId', executivecontroller.deleteAuthor.bind(executivecontroller));
router.post('/borrow-book', executivecontroller.borrowBook.bind(executivecontroller));
router.post('/return-book', executivecontroller.returnBook.bind(executivecontroller));

export = router;
