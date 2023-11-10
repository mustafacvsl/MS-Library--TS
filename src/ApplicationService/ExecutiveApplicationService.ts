import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import authEntity from '../Domain/User/auth.entity';
import { ILoanedModel } from '../Domain/Loaned/loaned.entity';
import ExecutiveService from '../Domain/Executive/executive.service';
import { errorHandler } from '../middleware/errorhandlerMiddleware';
import { handleResponse } from '../infrastructure/response';
import { Response } from 'express';

@injectable()
export class ExecutiveApplicationService {
    constructor(@inject(ExecutiveService) private executiveservice: ExecutiveService) {}

    @errorHandler()
    async listUsers(res: Response) {
        const users = await authEntity.find({}, 'name email');
        handleResponse(res, 200, { users }, 'Users listed successfully');
    }

    @errorHandler()
    async updateAuthor(authorId: string, updateData: any, res: Response) {
        const author = await authEntity.findByIdAndUpdate(authorId, updateData, { new: true });

        if (!author) {
            handleResponse(res, 404, null, 'Author not found');
        } else {
            handleResponse(res, 200, { author }, 'Author updated successfully');
        }
    }

    @errorHandler()
    async deleteAuthor(authorId: string, res: Response) {
        const author = await authEntity.findByIdAndDelete(authorId);

        if (!author) {
            handleResponse(res, 404, null, 'Author not found');
        } else {
            handleResponse(res, 200, { author, message: 'Deleted' }, 'Author deleted successfully');
        }
    }

    // @errorHandler()
    // async borrowBook(memberId: string, bookId: string, res: Response) {
    //     const loanedBook = await this.executiveservice.borrowBook(memberId, bookId);
    //     handleResponse(res, 200, { loanedBook }, 'Book borrowed successfully');
    // }

    @errorHandler()
    async returnBook(loanId: string, res: Response) {
        const returnedBook = await this.executiveservice.returnBook(loanId);
        handleResponse(res, 200, { returnedBook }, 'Book returned successfully');
    }
}

export default ExecutiveApplicationService;
