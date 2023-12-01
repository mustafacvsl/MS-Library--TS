import express from 'express';
import { ExecutiveController } from '../Controller/executive.controller';
import { Schemas, JoiMiddleware } from '../middleware/JoiMiddleware';
import { ExecutiveApplicationService } from '../ApplicationService/ExecutiveApplicationService';
import ExecutiveService from '../Domain/Executive/executive.service';
import ExecutiveRepository from '../Domain/Executive/executive.repository';
import TransactionHandler from '../infrastructure/Transaction/TransactionManager';
import container from '../infrastructure/inversify';

const executiveapplicationservice = container.get<ExecutiveApplicationService>(ExecutiveApplicationService);
const executivecontroller = container.get<ExecutiveController>(ExecutiveController);
const executiverepository = container.get<ExecutiveRepository>(ExecutiveRepository);
const executiveservice = container.get<ExecutiveService>(ExecutiveService);
const transactionHandler = container.get<TransactionHandler>(TransactionHandler);

const router = express.Router();

router.get('/list', executivecontroller.listUsers.bind(executivecontroller));
router.patch('/update/:authorId', executivecontroller.updateUsers.bind(executivecontroller));
router.delete('/delete/:authorId', executivecontroller.deleteUsers.bind(executivecontroller));
router.post('/return-book', executivecontroller.returnBook.bind(executivecontroller));
router.post('/borrow-book', JoiMiddleware(Schemas.executive.borrowBook), executivecontroller.borrowBook.bind(executivecontroller));
export = router;
