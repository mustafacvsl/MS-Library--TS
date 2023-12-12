import express, { Router, Request, Response, NextFunction } from 'express';
import { MemberController } from '../Controller/MemberController';
import { MemberApplicationService } from '../ApplicationService/MemberApplicationLayer';
import TransactionHandler from '../middleware/TransactionMiddleware';
import AuthRepository from '../Domain/User/AuthRepository';
import { JoiMiddleware, Schema } from '../middleware/JoiMiddleware';
import { Container } from 'inversify';
import MemberRepository from '../Domain/Member/MemberRepository';
import MemberService from '../Domain/Member/MemberService';

const memberRouter: Router = express.Router();
const transaction = new TransactionHandler();
const memberrepository = new MemberRepository();
const authreposiypry = new AuthRepository();
const memberservice = new MemberService(memberrepository, authreposiypry);
const memberapplicationservice = new MemberApplicationService(memberservice, transaction);
const memberController = new MemberController(memberapplicationservice);

memberRouter.post('/add', JoiMiddleware(Schema.memberCreate), async (req: Request, res: Response, next: NextFunction) => {
    await memberController.addMember(req, res, next);
});

export default memberRouter;
