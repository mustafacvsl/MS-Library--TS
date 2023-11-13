import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import MemberApplicationService from '../ApplicationService/MemberApplicationService';
import { handleResponse } from '../infrastructure/response';
import { errorHandler } from '../middleware/errorhandlerMiddleware';

@injectable()
export class MemberController {
    constructor(@inject('MemberApplicationService') private memberApplicationService: MemberApplicationService) {}

    @errorHandler()
    async register(req: Request, res: Response): Promise<void> {
        try {
            const { authorname, email } = req.body;
            const { member } = await this.memberApplicationService.registerMember(authorname, email);

            handleResponse(res, 201, { member });
        } catch (error) {
            handleResponse(res, 500, null, 'Internal Server Error');
        }
    }
}
