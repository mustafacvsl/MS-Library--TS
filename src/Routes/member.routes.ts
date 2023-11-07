import express from 'express';
import mongoose from 'mongoose';
import { MemberController } from '../Controller/Member.controller';
import { MemberApplicationService } from '../ApplicationService/MemberApplicationService';
import { MemberService } from '../Domain/Member/member.service';
import { MemberRepository } from '../Domain/Member/member.repository';
import { Model } from 'mongoose';
import authEntity, { IAuthorModel } from '../Domain/User/auth.entity';
import memberEntity, { IMemberModel } from '../Domain/Member/member.entity';

const router = express.Router();

const memberModel = mongoose.model<IMemberModel>('Member');
const authorModel = mongoose.model<IAuthorModel>('Author');

const memberRepository = new MemberRepository(memberModel);
const memberService = new MemberService(authorModel, memberModel);
const memberApplicationService = new MemberApplicationService(memberService, memberModel);
const memberController = new MemberController(memberApplicationService);

router.post('/createmember', async (req, res, next) => {
    await memberController.createMemberFromAuthor(req, res, next);
});

export default router;
