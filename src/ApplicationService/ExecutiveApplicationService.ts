import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import authEntity from '../Domain/User/auth.entity';
import ExecutiveService from '../Domain/Executive/executive.service';
import { errorHandlerMiddleware } from '../middleware/errorhandlerMiddleware';
import { Response } from 'express';
const winston = require('winston');
import Joi from 'joi';
import TransactionHandler from '../infrastructure/Transaction/TransactionManager';
import Book from '../Domain/Book/Book';

@injectable()
export class ExecutiveApplicationService {
    constructor(@inject(ExecutiveService) private executiveservice: ExecutiveService, @inject(TransactionHandler) private transactionHandler: TransactionHandler) {}

    @errorHandlerMiddleware
    async listUsers(res: Response) {
        await this.transactionHandler.runInTransaction(async (session) => {
            const users = await authEntity.find({}, 'name email').session(session);
            res.status(200).json({ users, message: 'Users listed successfully' });
        });
    }

    @errorHandlerMiddleware
    async updateAuthor(authorId: string, updateData: any, res: Response) {
        await this.transactionHandler.runInTransaction(async (session) => {
            const schema = Joi.object({
                name: Joi.string(),
                email: Joi.string().email()
            });

            const { error } = schema.validate(updateData);

            if (error) {
                res.status(400).json({ message: 'Validation error', details: error.details });
                return;
            }

            const author = await authEntity.findByIdAndUpdate(authorId, updateData, { new: true }).session(session);

            if (!author) {
                res.status(404).json({ author, message: 'Author not found' });
            } else {
                res.status(200).json({ author, message: 'Author updated successfully' });
            }
        });
    }

    @errorHandlerMiddleware
    async deleteAuthor(authorId: string, res: Response) {
        await this.transactionHandler.runInTransaction(async (session) => {
            const author = await authEntity.findByIdAndDelete(authorId).session(session);

            if (!author) {
                res.status(404).json({ author, message: 'Author not found' });
            } else {
                res.status(200).json({ author, message: 'Author deleted successfully' });
            }
        });
    }

    @errorHandlerMiddleware
    async borrowBook(memberId: string, bookId: string, res: Response) {
        await this.transactionHandler.runInTransaction(async (session) => {
            const loanedBook = await this.executiveservice.borrowBook(memberId, bookId, session);
            res.status(200).json({ loanedBook, message: 'Book borrowed successfully' });
        });
    }

    @errorHandlerMiddleware
    async returnBook(loanId: string, res: Response) {
        await this.transactionHandler.runInTransaction(async (session) => {
            const returnedBook = await this.executiveservice.returnBook(loanId, session);
            res.status(200).json({ returnedBook, message: 'Book returned successfully' });
        });
    }
}

export default ExecutiveApplicationService;
