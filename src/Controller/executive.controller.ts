import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import Joi from 'joi';
import { handleResponse } from '../infrastructure/response';
import { errorHandlerMiddleware } from '../middleware/errorhandlerMiddleware';
import { ExecutiveApplicationService } from '../ApplicationService/ExecutiveApplicationService';

@injectable()
export class ExecutiveController {
    constructor(@inject('ExecutiveApplicationService') private executiveapplicationservice: ExecutiveApplicationService) {}

    borrowBook = async (req: Request, res: Response, next: NextFunction) => {
        const { memberId, bookId } = req.body;

        if (!memberId || !bookId) {
            handleResponse(res, 400, null, 'MemberId, bookId, and borrowedDate are required.');
            return;
        }

        await this.executiveapplicationservice.borrowBook(memberId, bookId, res);
    };

    returnBook = async (req: Request, res: Response, next: NextFunction) => {
        const { loanedId } = req.body;

        if (!loanedId) {
            handleResponse(res, 400, null, 'LoanedId is required.');
            return;
        }

        await this.executiveapplicationservice.returnBook(loanedId, res);
    };

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;
        const { name, email, password } = req.body;

        if (!userId || !name || !email || !password) {
            handleResponse(res, 400, null, 'UserId, name, email, and password are required.');
            return;
        }

        await this.executiveapplicationservice.updateUser(userId, { name, email, password }, res);
    };

    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;

        if (!userId) {
            handleResponse(res, 400, null, 'UserId is required.');
            return;
        }

        await this.executiveapplicationservice.deleteUser(userId, res);
    };

    getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        await this.executiveapplicationservice.getAllUsers(res);
    };

    getUserById = async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;

        if (!userId) {
            handleResponse(res, 400, null, 'UserId is required.');
            return;
        }

        await this.executiveapplicationservice.getUserById(userId, res);
    };
}
