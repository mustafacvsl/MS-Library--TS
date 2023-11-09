import { NextFunction, Request, Response, Router } from 'express';
import authEntity from '../Domain/User/auth.entity';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import ExecutiveApplicationService from '../ApplicationService/ExecutiveApplicationService';
import ExecutiveRepository from '../Domain/Executive/executive.repository';
import { handleResponse } from '../infrastructure/response';

@injectable()
export class ExecutiveController {
    constructor(@inject('ExecutiveApplicationService') private executiveapplicationservice: ExecutiveApplicationService) {}

    async listUsers(req: Request, res: Response) {
        try {
            const users = await this.executiveapplicationservice.listUsers();
            handleResponse(res, 200, { users });
        } catch (error) {
            handleResponse(res, 500, null, 'Internal Server Error');
        }
    }

    async updateAuthor(req: Request, res: Response, next: NextFunction) {
        const authorId = req.params.authorId;
        const updateData = req.body;

        try {
            const author = await this.executiveapplicationservice.updateAuthor(authorId, updateData);
            handleResponse(res, 201, { author });
        } catch (error) {
            handleResponse(res, 500, null, 'Internal Server Error');
        }
    }

    async deleteAuthor(req: Request, res: Response, next: NextFunction) {
        const authorId = req.params.authorId;

        try {
            const author = await this.executiveapplicationservice.deleteAuthor(authorId);
            handleResponse(res, 201, { author, message: 'Deleted' });
        } catch (error) {
            handleResponse(res, 500, null, 'Internal Server Error');
        }
    }

    async borrowBook(req: Request, res: Response, next: NextFunction) {
        const { memberId, bookId } = req.body;

        try {
            const loanedBook = await this.executiveapplicationservice.borrowBook(memberId, bookId);
            handleResponse(res, 201, { loanedBook });
        } catch (error) {
            handleResponse(res, 500, null, 'Internal Server Error');
        }
    }

    async returnBook(req: Request, res: Response, next: NextFunction) {
        const loanId = req.params.loanId;

        try {
            const returnedBook = await this.executiveapplicationservice.returnBook(loanId);
            handleResponse(res, 201, { returnedBook });
        } catch (error) {
            handleResponse(res, 500, null, 'Internal Server Error');
        }
    }
}
