import express, { Router, Request, Response, NextFunction } from 'express';
import { container } from '../infrastructure/İnversify';
import { JoiMiddleware, Schema } from '../middleware/JoiMiddleware';
import { MemberController } from '../Controller/MemberController';
import { transactionMiddleware } from '../middleware/TransactionMiddleware';
import { errorHandlerMiddleware } from '../middleware/ErrorHandlerMiddleware';
const memberRouter: Router = express.Router();

const memberController = container.resolve<MemberController>(MemberController);

memberRouter.post('/add', errorHandlerMiddleware, transactionMiddleware, JoiMiddleware(Schema.memberCreate), async (req: Request, res: Response, next: NextFunction) => {
    await memberController.addMember(req, res, next);
});

export default memberRouter;
