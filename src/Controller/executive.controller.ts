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

    @errorHandlerMiddleware
    async listUsers(req: Request, res: Response, next: NextFunction) {
        const users = await this.executiveapplicationservice.listUsers(res);
        handleResponse(res, 200, { users }, 'Users listed successfully');
    }

    @errorHandlerMiddleware
    async updateUsers(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.userId;
        const data = req.body;
        const updatedUser = await this.executiveapplicationservice.updateUsers(userId, data, res);
        handleResponse(res, 200, { updatedUser }, 'User updated successfully');
    }

    @errorHandlerMiddleware
    async deleteUsers(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.userId;
        const deletedUser = await this.executiveapplicationservice.deleteUsers(userId, res);
        handleResponse(res, 200, { deletedUser }, 'User deleted successfully');
    }

    @errorHandlerMiddleware
    async borrowBook(req: Request, res: Response, next: NextFunction) {
        const { memberId, bookId, borrowedDate, returnedDate } = req.body;

        const loanedBook = await this.executiveapplicationservice.borrowBook(memberId, bookId, borrowedDate, returnedDate, res);
        handleResponse(res, 201, { loanedBook });
    }

    @errorHandlerMiddleware
    async returnBook(req: Request, res: Response, next: NextFunction) {
        const loanId = req.params.loanId;

        const returnedBook = await this.executiveapplicationservice.returnBook(loanId, res);
        handleResponse(res, 201, { returnedBook });
    }
}
