import { inject, injectable } from 'inversify';
import { Response } from 'express'; // Import Response from 'express'
import { errorHandlerMiddleware } from '../../middleware/errorhandlerMiddleware';
import { handleResponse } from '../../infrastructure/response';
import { addDays } from 'date-fns';
import { ClientSession } from 'mongoose';
import { ExecutiveRepository } from './executive.repository';
import authEntity, { IAuthorModel } from '../User/auth.entity';
import Book from '../Book/Book';
import memberEntity from '../Member/member.entity';
import loanedEntity from '../Loaned/loaned.entity';
import parse from 'date-fns';

@injectable()
class ExecutiveService {
    constructor(@inject(ExecutiveRepository) private executiverepository: ExecutiveRepository) {}

    async borrowBook(memberId: string, bookId: string, res: Response, session: ClientSession): Promise<any> {
        const borrowedBook = await this.executiverepository.borrowBook(memberId, bookId, session);
        const member = await memberEntity.findById(memberId);
        const book = await Book.findById(bookId);

        if (!member || !book) {
            handleResponse(res, 404, null, 'Member or book not found');
            return;
        }

        handleResponse(res, 201, { loaned: borrowedBook, member, book }, 'Book borrowed successfully');
    }

    @errorHandlerMiddleware
    async returnBook(loanedId: string, res: Response, session: ClientSession): Promise<void> {
        const returnedBook = await this.executiverepository.returnBook(loanedId, session);

        if (!returnedBook) {
            handleResponse(res, 404, null, 'Loaned record not found');
            return;
        }

        handleResponse(res, 200, { returnedBook }, 'Book returned successfully');
    }

    @errorHandlerMiddleware
    async updateUser(userId: string, updates: Partial<IAuthorModel>, res: Response): Promise<any> {
        const user = await this.executiverepository.updateUser(userId, updates);

        if (!user) {
            handleResponse(res, 404, null, 'User not found');
            return;
        }

        handleResponse(res, 200, { user }, 'User updated successfully');
    }

    @errorHandlerMiddleware
    async deleteUser(userId: string, res: Response): Promise<void> {
        await this.executiverepository.deleteUser(userId);
        handleResponse(res, 200, null, 'User deleted successfully');
    }

    @errorHandlerMiddleware
    async getAllUsers(res: Response): Promise<void> {
        const users = await this.executiverepository.getAllUsers();
        handleResponse(res, 200, { users }, 'Users listed successfully');
    }

    @errorHandlerMiddleware
    async getUserById(userId: string, res: Response): Promise<void> {
        const user = await this.executiverepository.getUserById(userId);

        if (!user) {
            handleResponse(res, 404, null, 'User not found');
            return;
        }

        handleResponse(res, 200, { user }, 'User retrieved successfully');
    }
}

export default ExecutiveService;
