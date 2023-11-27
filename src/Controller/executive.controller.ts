import { NextFunction, Request, Response, Router } from 'express';
import authEntity from '../Domain/User/auth.entity';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import Joi from 'joi';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import ExecutiveApplicationService from '../ApplicationService/ExecutiveApplicationService';
import ExecutiveRepository from '../Domain/Executive/executive.repository';
import { handleResponse } from '../infrastructure/response';
import { errorHandlerMiddleware } from '../middleware/errorhandlerMiddleware';

@injectable()
export class ExecutiveController {
    constructor(@inject('ExecutiveApplicationService') private executiveapplicationservice: ExecutiveApplicationService) {}

    @errorHandlerMiddleware
    async listUsers(req: Request, res: Response) {
        const users = await this.executiveapplicationservice.listUsers(res);
        handleResponse(res, 200, { users });
    }

    @errorHandlerMiddleware
    async listBooksUsers(req: Request, res: Response) {
        const book = await this.executiveapplicationservice.listBooksUsers(res);
        handleResponse(res, 200, { book });
    }

    @errorHandlerMiddleware
    async updateAuthor(req: Request, res: Response, next: NextFunction) {
        const authorId = req.params.authorId;
        const updateData = req.body;

        const schema = Joi.object({
            name: Joi.string(),
            email: Joi.string().email()
        });

        const { error } = schema.validate(updateData);

        if (error) {
            handleResponse(res, 400, { message: 'Validation error', details: error.details });
            return;
        }

        const author = await this.executiveapplicationservice.updateAuthor(authorId, updateData, res);
        handleResponse(res, 201, { author });
    }

    @errorHandlerMiddleware
    async deleteAuthor(req: Request, res: Response, next: NextFunction) {
        const authorId = req.params.authorId;

        const author = await this.executiveapplicationservice.deleteAuthor(authorId, res);
        handleResponse(res, 201, { author, message: 'Deleted' });
    }

    @errorHandlerMiddleware
    async borrowBook(req: Request, res: Response, next: NextFunction) {
        const { memberId, bookId } = req.body;

        const loanedBook = await this.executiveapplicationservice.borrowBook(memberId, bookId, res);
        handleResponse(res, 201, { loanedBook });
    }

    @errorHandlerMiddleware
    async returnBook(req: Request, res: Response, next: NextFunction) {
        const loanId = req.params.loanId;

        const returnedBook = await this.executiveapplicationservice.returnBook(loanId, res);
        handleResponse(res, 201, { returnedBook });
    }
}
