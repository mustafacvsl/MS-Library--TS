import express from 'express';
import { JoiMiddleware, Schema } from '../middleware/JoiMiddleware';
import { container } from '../infrastructure/İnversify';
import { ExecutiveController } from '../Controller/ExecutiveController';

const router = express.Router();
const executivecontroller = container.resolve<ExecutiveController>(ExecutiveController);

router.post('/borrow-book', JoiMiddleware(Schema.borrowBook), executivecontroller.borrowBook.bind(executivecontroller));
router.patch('/update', JoiMiddleware(Schema.updateUser), executivecontroller.updateUser.bind(executivecontroller));
router.delete('/delete', JoiMiddleware(Schema.userId), executivecontroller.updateUser.bind(executivecontroller));
router.get('/getAll', executivecontroller.getAllUsers.bind(executivecontroller));
router.get('/getUser', JoiMiddleware(Schema.userId), executivecontroller.getUserById.bind(executivecontroller));
export = router;
