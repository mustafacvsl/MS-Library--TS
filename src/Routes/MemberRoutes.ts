import express, { Router, Request, Response, NextFunction } from 'express';
import { container } from '../infrastructure/Inversify';
import { JoiMiddleware, Schema } from '../middleware/JoiMiddleware';
import { MemberController } from '../Controller/MemberController';
import { TransactionMiddleware } from '../middleware/TransactionMiddleware';
const memberRouter: Router = express.Router();

const memberController = container.resolve<MemberController>(MemberController);

memberRouter.post('/add', TransactionMiddleware, JoiMiddleware(Schema.memberCreate), async (req: Request, res: Response, next: NextFunction) => {
    await memberController.addMember(req, res, next);
});

export default memberRouter;
