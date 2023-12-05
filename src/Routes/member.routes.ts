import express, { Router, Request, Response, NextFunction } from 'express';
import { MemberController } from '../Controller/Member.controller';
import { MemberApplicationService } from '../ApplicationService/MemberApplicationService';
import TransactionHandler from '../infrastructure/Transaction/TransactionManager';
import AuthRepository from '../Domain/User/Auth.repository';

import { Container } from 'inversify';
import MemberRepository from '../Domain/Member/member.repository';
import MemberService from '../Domain/Member/member.service';

const memberRouter: Router = express.Router();
const transaction = new TransactionHandler();
const memberrepository = new MemberRepository();
const authreposiypry = new AuthRepository();
const memberservice = new MemberService(memberrepository, authreposiypry);
const memberapplicationservice = new MemberApplicationService(memberservice, transaction);
const memberController = new MemberController(memberapplicationservice);

memberRouter.post('/add', async (req: Request, res: Response, next: NextFunction) => {
    await memberController.addMember(req, res, next);
});

export default memberRouter;
