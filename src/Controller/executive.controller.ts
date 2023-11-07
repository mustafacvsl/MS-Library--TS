import { NextFunction, Request, Response, Router } from 'express';
import container from '../infrastructure/inversify';
import Author from '../Domain/User/auth.entity';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import ExecutiveApplicationService from '../ApplicationService/ExecutiveApplicationService';

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
        try {
            const { memberId, bookId } = req.body;
            const loaned = await this.executiveapplicationservice.borrowBook(memberId, bookId);
            res.status(201).json(loaned);
        } catch (err) {
            next(err);
        }
    }

    async returnBook(req: Request, res: Response, next: NextFunction) {
        try {
            const loanedId = req.params.loanedId;
            await this.executiveapplicationservice.returnBook(loanedId);
            res.status(200).json({ message: 'Book returned successfully' });
        } catch (err) {
            next(err);
        }
    }
}
