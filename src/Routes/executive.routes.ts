import express from 'express';
import { ExecutiveController } from '../Controller/executive.controller';
import { Schemas, ValidateJoi } from '../middleware/Joi';
import ExecutiveApplicationService from '../ApplicationService/ExecutiveApplicationService';
import ExecutiveService from '../Domain/Executive/executive.service';
import ExecutiveRepository from '../Domain/Executive/executive.repository';

const router = express.Router();
const executiverepository = new ExecutiveRepository();
const executiveservice = new ExecutiveService(executiverepository);
const executiveapplicationservice = new ExecutiveApplicationService(executiveservice);
const executivecontroller = new ExecutiveController(executiveapplicationservice);

router.get('/list', executivecontroller.listUsers.bind(executivecontroller));
router.patch('/update/:authorId', ValidateJoi(Schemas.author.update), executivecontroller.updateAuthor.bind(executivecontroller));
router.delete('/delete/:authorId', executivecontroller.deleteAuthor.bind(executivecontroller));
router.post('/borrow-book', executivecontroller.borrowBook.bind(executivecontroller));
router.post('/return-book', executivecontroller.returnBook.bind(executivecontroller));

export = router;
