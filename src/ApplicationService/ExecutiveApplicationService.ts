import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Response } from 'express';
import { errorHandlerMiddleware } from '../middleware/errorhandlerMiddleware';
import Joi from 'joi';
import TransactionHandler from '../infrastructure/Transaction/TransactionManager';
import ExecutiveService from '../Domain/Executive/executive.service';
import { handleResponse } from '../infrastructure/response';

@injectable()
export class ExecutiveApplicationService {
    constructor(@inject(ExecutiveService) private executiveservice: ExecutiveService, @inject(TransactionHandler) private transactionHandler: TransactionHandler) {}

    async borrowBook(memberId: string, bookId: string, res: Response): Promise<void> {
        return this.transactionHandler.runInTransaction(async (session) => {
            const borrowedBook = await this.executiveservice.borrowBook(memberId, bookId, session);

            if (borrowedBook) {
                const responseData = {
                    status: 200,
                    data: borrowedBook,
                    message: 'Book borrowed successfully'
                };

                handleResponse(res, responseData.status, responseData.data, responseData.message);
            } else {
                handleResponse(res, 400, null, 'Unable to borrow the book');
            }
        });
    }

    @errorHandlerMiddleware
    async returnBook(loanId: string, res: Response) {
        return this.transactionHandler.runInTransaction(async (session) => {
            return this.executiveservice.returnBook(loanId, session);
        });
    }
}
