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
}
