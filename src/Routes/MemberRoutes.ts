import express, { Router, Request, Response, NextFunction } from 'express';
import configureContainer from '../infrastructure/Inversify';
import { JoiMiddleware, Schema } from '../middleware/JoiMiddleware';
import { MemberController } from '../Controller/MemberController';
import { TransactionMiddleware } from '../middleware/TransactionMiddleware';
import { Container } from 'inversify';
const memberRouter: Router = express.Router();

const container = new Container();
configureContainer(container);

const memberController = container.resolve<MemberController>(MemberController);

memberRouter.post('/add', TransactionMiddleware, JoiMiddleware(Schema.memberCreate), async (req: Request, res: Response, next: NextFunction) => {
    await memberController.addMember(req, res, next);
});

export default memberRouter;
