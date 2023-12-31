import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { MemberApplicationService } from '../ApplicationService/MemberApplicationService';
import { HandleResponse } from '../infrastructure/Response';

@injectable()
export class MemberController {
    constructor(@inject(MemberApplicationService) private memberApplicationService: MemberApplicationService) {}

    async addMember(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { name, email } = req.body;

        const addedMember = await this.memberApplicationService.addMember(name, email);

        HandleResponse(res, 201, { member: addedMember }, 'Member added successfully 😊');
    }
}
