import express from 'express';
import { MemberController } from '../Controller/Member.controller';
import { MemberApplicationService } from '../ApplicationService/MemberApplicationService';
import MemberService from '../Domain/Member/member.service';
import MemberRepository from '../Domain/Member/member.repository';

const router = express.Router();
const memberrepository = new MemberRepository();
const memberservice = new MemberService(memberrepository);
const memberapplicationservice = new MemberApplicationService(memberservice);
const memberController = new MemberController(memberapplicationservice);

router.post('/registermember', async (req, res) => {
    await memberController.addMember(req, res);
});

export default router;
