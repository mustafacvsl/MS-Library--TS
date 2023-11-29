import express, { Router, Request, Response, NextFunction } from 'express';
import { MemberController } from '../Controller/Member.controller';
import { MemberApplicationService } from '../ApplicationService/MemberApplicationService';
import TransactionHandler from '../infrastructure/Transaction/TransactionManager';
import MemberService from '../Domain/Member/member.service';
import MemberRepository from '../Domain/Member/member.repository';
import AuthRepository from '../Domain/User/Auth.repository';
import container from '../infrastructure/inversify';

const memberRouter: Router = express.Router();
const memberapplicationservice = container.get<MemberApplicationService>(MemberApplicationService);
const memberController = container.get<MemberController>(MemberController);
const memberrepo = container.get<MemberRepository>(MemberRepository);
const memberservice = container.get<MemberService>(MemberService);
const authrepo = container.get<AuthRepository>(AuthRepository);
const transactionHandler = container.get<TransactionHandler>(TransactionHandler);
memberRouter.post('/add', async (req: Request, res: Response, next: NextFunction) => {
    await memberController.addMember(req, res);
});

export default memberRouter;
