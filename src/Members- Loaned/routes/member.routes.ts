import express from 'express';
import { MemberController } from '../Controller/Member.controller';
import { Schemas, ValidateJoi } from '../../middleware/Joi';
import MemberApplicationService from '../ApplicationService/MemberApplicationService';
import MemberService from '../Domain/Member/member.service';
import MemberRepository from '../Domain/Member/member.repository';

const router = express.Router();
const memberrepository = new MemberRepository();
const memberservice = new MemberService(memberrepository);
const memberapplicationservice = new MemberApplicationService(memberservice);
const membercontroller = new MemberController(memberapplicationservice);

router.post('/register', membercontroller.register.bind(membercontroller));
router.post('/login', membercontroller.login.bind(membercontroller));

export = router;
