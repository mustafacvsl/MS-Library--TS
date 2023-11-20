import { errorHandlerMiddleware } from '../middleware/errorhandlerMiddleware';
import { Request, Response } from 'express';
import { MemberApplicationService } from '../ApplicationService/MemberApplicationService';
import { handleResponse } from '../infrastructure/response';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class MemberController {
    constructor(@inject('MemberApplicationService') private memberApplicationService: MemberApplicationService) {}

    @errorHandlerMiddleware
    async makeMember(req: Request, res: Response): Promise<void> {
        const { authorName, email } = req.body;
        await this.memberApplicationService.makeMember(authorName, email);
        handleResponse(res, 200, {}, 'User successfully made a member');
    }
}
