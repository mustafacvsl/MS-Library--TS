import express from 'express';
import { ExecutiveController } from '../Controller/ExecutiveController';

import { Container } from 'inversify';
import TransactionHandler from '../middleware/TransactionMiddleware';
import { ExecutiveRepository } from '../Domain/Executive/ExecutiveRepository ';
import ExecutiveService from '../Domain/Executive/ExecutiveService';
import { ExecutiveApplicationService } from '../ApplicationService/ExecutiveApplicationLayer';

const container = new Container();
const transaction = new TransactionHandler();
const executiveroutes = new ExecutiveRepository();
const executiveservice = new ExecutiveService(executiveroutes);
const executiveapplicationservice = new ExecutiveApplicationService(executiveservice, transaction);
const executivecontroller = new ExecutiveController(executiveapplicationservice);

const router = express.Router();

router.post('/borrow-book', executivecontroller.borrowBook.bind(executivecontroller));
router.patch('/update', executivecontroller.updateUser.bind(executivecontroller));
router.delete('/delete', executivecontroller.updateUser.bind(executivecontroller));
router.get('/getAll', executivecontroller.getAllUsers.bind(executivecontroller));
router.get('/getUser', executivecontroller.getUserById.bind(executivecontroller));
export = router;
