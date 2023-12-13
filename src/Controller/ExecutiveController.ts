import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import { handleResponse } from '../infrastructure/Response';
import { ExecutiveApplicationService } from '../ApplicationService/ExecutiveApplicationLayer';

@injectable()
export class ExecutiveController {
    constructor(@inject(ExecutiveApplicationService) private executiveapplicationservice: ExecutiveApplicationService) {}

    borrowBook = async (req: Request, res: Response, next: NextFunction) => {
        const { memberId, bookId } = req.body;

        await this.executiveapplicationservice.borrowBook(memberId, bookId, res);
    };

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;
        const { name, email, password } = req.body;

        await this.executiveapplicationservice.updateUser(userId, { name, email, password }, res);
    };

    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;
        await this.executiveapplicationservice.deleteUser(userId, res);
    };

    getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        await this.executiveapplicationservice.getAllUsers(res);
    };

    getUserById = async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;

        await this.executiveapplicationservice.getUserById(userId, res);
    };
}
