import express, { Router, Request, Response, NextFunction } from 'express';
import { MemberController } from '../Controller/Member.controller';
import { MemberApplicationService } from '../ApplicationService/MemberApplicationService';
import TransactionHandler from '../infrastructure/Transaction/TransactionManager';
import MemberService from '../Domain/Member/member.service';
import MemberRepository from '../Domain/Member/member.repository';

const memberRouter: Router = express.Router();
const TransactionManager = new TransactionHandler();
const memberRepository = new MemberRepository();
const memberService = new MemberService(memberRepository);
const memberApplicationService = new MemberApplicationService(memberService, TransactionManager);
const memberController = new MemberController(memberApplicationService);

memberRouter.post('/add', async (req: Request, res: Response, next: NextFunction) => {
    await memberController.addMember(req, res);
});

export default memberRouter;
