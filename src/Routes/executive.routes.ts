import express from 'express';
import { ExecutiveController } from '../Controller/executive.controller';
import { Schemas, JoiMiddleware } from '../middleware/JoiMiddleware';

import { Container } from 'inversify';
import TransactionHandler from '../infrastructure/Transaction/TransactionManager';
import ExecutiveRepository from '../Domain/Executive/executive.repository';
import ExecutiveService from '../Domain/Executive/executive.service';
import { ExecutiveApplicationService } from '../ApplicationService/ExecutiveApplicationService';

const container = new Container();
const transaction = new TransactionHandler();
const executiveroutes = new ExecutiveRepository();
const executiveservice = new ExecutiveService(executiveroutes);
const executiveapplicationservice = new ExecutiveApplicationService(executiveservice, transaction);
const executivecontroller = new ExecutiveController(executiveapplicationservice);

const router = express.Router();

// router.post('/return-book', executivecontroller.returnBook.bind(executivecontroller));
router.post('/borrow-book', JoiMiddleware(Schemas.executive.borrowBook), executivecontroller.borrowBook.bind(executivecontroller));
export = router;
