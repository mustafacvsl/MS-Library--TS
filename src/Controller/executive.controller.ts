import { NextFunction, Request, Response, Router } from 'express';
import authEntity from '../Domain/User/auth.entity';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import ExecutiveApplicationService from '../ApplicationService/ExecutiveApplicationService';
import ExecutiveRepository from '../Domain/Executive/executive.repository';

@injectable()
export class ExecutiveController {
    constructor(@inject('ExecutiveApplicationService') private executiveapplicationservice: ExecutiveApplicationService) {}

    async listUsers(req: Request, res: Response) {
        const users = await this.executiveapplicationservice.listUsers();

        res.status(200).json({ users });
    }

    async updateAuthor(req: Request, res: Response, next: NextFunction) {
        const authorId = req.params.authorId;
        const updateData = req.body;

        const author = await this.executiveapplicationservice.updateAuthor(authorId, updateData);

        res.status(201).json({ author });
    }

    async deleteAuthor(req: Request, res: Response, next: NextFunction) {
        const authorId = req.params.authorId;

        const author = await this.executiveapplicationservice.deleteAuthor(authorId);

        res.status(201).json({ author, message: 'Deleted' });
    }

    async borrowBook(req: Request, res: Response, next: NextFunction) {
        const { memberId, bookId } = req.body;

        try {
            const loanedBook = await this.executiveapplicationservice.borrowBook(memberId, bookId);
            res.status(201).json({ loanedBook });
        } catch (error) {
            next(error);
        }
    }

    async returnBook(req: Request, res: Response, next: NextFunction) {
        const loanId = req.params.loanId;

        try {
            const returnedBook = await this.executiveapplicationservice.returnBook(loanId);
            res.status(201).json({ returnedBook });
        } catch (error) {
            next(error);
        }
    }
}
