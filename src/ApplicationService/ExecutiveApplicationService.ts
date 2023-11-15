import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import authEntity from '../Domain/User/auth.entity';
import ExecutiveService from '../Domain/Executive/executive.service';
import { errorHandlerMiddleware } from '../middleware/errorhandlerMiddleware';
import { Response } from 'express';
const winston = require('winston');
import Joi from 'joi';

const logger = winston.createLogger({
    transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), new winston.transports.File({ filename: 'logs/combined.log' })]
});

@injectable()
export class ExecutiveApplicationService {
    constructor(@inject(ExecutiveService) private executiveservice: ExecutiveService) {}

    @errorHandlerMiddleware
    async listUsers(res: Response) {
        const users = await authEntity.find({}, 'name email');
        res.status(200).json({ users, message: 'Users listed successfully' });
    }

    async updateAuthor(authorId: string, updateData: any, res: Response) {
        const schema = Joi.object({
            name: Joi.string(),
            email: Joi.string().email()
        });

        const { error } = schema.validate(updateData);

        if (error) {
            res.status(400).json({ message: 'Validation error', details: error.details });
            return;
        }

        const author = await authEntity.findByIdAndUpdate(authorId, updateData, { new: true });

        if (!author) {
            res.status(404).json({ author, message: 'Author not found' });
        } else {
            res.status(200).json({ author, message: 'Author updated successfully' });
        }
    }

    @errorHandlerMiddleware
    async deleteAuthor(authorId: string, res: Response) {
        const author = await authEntity.findByIdAndDelete(authorId);

        if (!author) {
            res.status(404).json({ author, message: 'Author not found' });
        } else {
            res.status(200).json({ author, message: 'Author deleted successfully' });
        }
    }

    @errorHandlerMiddleware
    async borrowBook(memberId: string, bookId: string, res: Response) {
        const loanedBook = await this.executiveservice.borrowBook(memberId, bookId);
        res.status(200).json({ loanedBook, message: 'Book borrowed successfully' });
    }

    @errorHandlerMiddleware
    async returnBook(loanId: string, res: Response) {
        const returnedBook = await this.executiveservice.returnBook(loanId);
        res.status(200).json({ returnedBook, message: 'Book returned successfully' });
    }
}

export default ExecutiveApplicationService;
