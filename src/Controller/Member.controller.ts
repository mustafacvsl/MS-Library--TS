import { NextFunction, Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import MemberApplicationService from '../ApplicationService/MemberApplicationService';

@injectable()
export class MemberController {
    constructor(@inject('MemberApplicationService') private memberApplicationService: MemberApplicationService) {}

    async createUserAsMember(req: Request, res: Response) {
        const { userId, email } = req.body;

        const userAsMember = await this.memberApplicationService.createUserAsMember(userId, email);

        if (userAsMember) {
            res.status(201).json({ userAsMember });
        } else {
            res.status(409).json({ message: 'Kullanıcı zaten üye olarak kaydedilmiş.' });
        }
    }
}
