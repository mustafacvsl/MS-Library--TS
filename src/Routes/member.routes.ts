import { Router } from 'express';
import { MemberController } from '../Controller/Member.controller';
import MemberApplicationService from '../ApplicationService/MemberApplicationService';
import MemberService from '../Domain/Member/member.service';
import MemberRepository from '../Domain/Member/member.repository';
const router = Router();

const memberrepository = new MemberRepository();
const memberservice = new MemberService(memberrepository);
const memberapplicationservice = new MemberApplicationService(memberservice);
const memberController = new MemberController(memberapplicationservice);

router.post('/createMember', memberController.createUserAsMember);

export default router;
