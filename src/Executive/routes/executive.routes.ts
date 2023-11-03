import express from 'express';
import { ExecutiveController } from '../controller/executive.controller';
import { Schemas, ValidateJoi } from '../../middleware/Joi';
import ExecutiveApplicationService from '../ApplicationService/ExecutiveApplicationService';
import ExecutiveService from '../domain/Admin/executive.service';
import ExecutiveRepository from '../domain/Admin/executive.repository';

const router = express.Router();
const executiverepository = new ExecutiveRepository();
const executiveservice = new ExecutiveService(executiverepository);
const executiveapplicationservice = new ExecutiveApplicationService(executiveservice);
const executivecontroller = new ExecutiveController(executiveapplicationservice);

router.get('/list', executivecontroller.listUsers.bind(executivecontroller));

router.patch('/update/:authorId', ValidateJoi(Schemas.author.update), executivecontroller.updateAuthor.bind(executivecontroller));
router.delete('/delete/:authorId', executivecontroller.deleteAuthor.bind(executivecontroller));

export = router;
