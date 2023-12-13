import express, { Router, Request, Response, NextFunction } from 'express';
import { container } from '../infrastructure/İnversify';
import { JoiMiddleware, Schema } from '../middleware/JoiMiddleware';
import { MemberController } from '../Controller/MemberController';

const memberRouter: Router = express.Router();

const memberController = container.resolve<MemberController>(MemberController);

memberRouter.post('/add', JoiMiddleware(Schema.memberCreate), async (req: Request, res: Response, next: NextFunction) => {
    await memberController.addMember(req, res, next);
});

export default memberRouter;
