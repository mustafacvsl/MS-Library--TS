import { errorHandlerMiddleware } from '../middleware/errorhandlerMiddleware';
import { NextFunction, Request, Response, Router } from 'express';
import container from '../infrastructure/inversify';
import MemberEntity from '../Domain/Member/member.entity';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { MemberApplicationService } from '../ApplicationService/MemberApplicationService';
import { handleResponse } from '../infrastructure/response';

@injectable()
export class MemberController {
    constructor(@inject('MemberApplicationService') private memberApplicationService: MemberApplicationService) {}

    @errorHandlerMiddleware
    async addMember(req: Request, res: Response): Promise<void> {
        const { name, email } = req.body;
        await this.memberApplicationService.addMember(name, email, res);
        handleResponse(res, 201, null, 'Member added successfully');
    }
}
