import express from 'express';
import { ExecutiveController } from '../Controller/executive.controller';
import { Schemas, JoiMiddleware } from '../middleware/JoiMiddleware';

import container from '../infrastructure/inversify';

const executivecontroller = container.get<ExecutiveController>(ExecutiveController);

const router = express.Router();

router.get('/list', executivecontroller.listUsers.bind(executivecontroller));
router.patch('/update/:authorId', executivecontroller.updateUsers.bind(executivecontroller));
router.delete('/delete/:authorId', executivecontroller.deleteUsers.bind(executivecontroller));
router.post('/return-book', executivecontroller.returnBook.bind(executivecontroller));
router.post('/borrow-book', JoiMiddleware(Schemas.executive.borrowBook), executivecontroller.borrowBook.bind(executivecontroller));
export = router;
