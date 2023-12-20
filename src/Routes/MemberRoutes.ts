import express, { Router, Request, Response, NextFunction } from 'express';
import configureContainer from '../infrastructure/Inversify';
import { ValidationMiddleware, Schema } from '../middleware/ValidationMiddleware';
import { MemberController } from '../Controller/MemberController';
import { TransactionMiddleware } from '../middleware/TransactionMiddleware';
import { Container } from 'inversify';
const memberRouter: Router = express.Router();

const container = new Container();
configureContainer(container);

const memberController = container.resolve<MemberController>(MemberController);

memberRouter.post('/add', TransactionMiddleware, ValidationMiddleware(Schema.memberCreate), async (req: Request, res: Response, next: NextFunction) => {
    await memberController.addMember(req, res, next);
});

export default memberRouter;
