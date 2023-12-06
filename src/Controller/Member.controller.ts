import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { isValidEmail } from '../infrastructure/validEmail';
import { MemberApplicationService } from '../ApplicationService/MemberApplicationService';
import { handleResponse } from '../infrastructure/response';

@injectable()
export class MemberController {
    constructor(@inject('MemberApplicationService') private memberApplicationService: MemberApplicationService) {}

    async addMember(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, email } = req.body;

            if (!name || !email) {
                handleResponse(res, 400, null, 'Name and email are required.');
                return;
            }

            if (!isValidEmail(email)) {
                handleResponse(res, 400, null, 'Invalid email address.');
                return;
            }

            const addedMember = await this.memberApplicationService.addMember(name, email, res);

            handleResponse(res, 201, { member: addedMember }, 'Member added successfully 😊');
        } catch (error) {
            console.error('Error:', error);
            handleResponse(res, 500, null, 'Internal Server Error');
        }
    }
}
