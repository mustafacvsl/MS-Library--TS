import { inject, injectable } from 'inversify';
import { Response } from 'express'; // Import Response from 'express'
import { errorHandlerMiddleware } from '../../middleware/ErrorHandlerMiddleware';
import { handleResponse } from '../../infrastructure/Response';
import { addDays } from 'date-fns';
import { ClientSession } from 'mongoose';
import { ExecutiveRepository } from './ExecutiveRepository ';
import authEntity, { IAuthorModel } from '../User/AuthEntity';
import Book from '../Book/BookEntity';
import memberEntity from '../Member/MemberEntity';
import loanedEntity from '../Loaned/LoanedEntity';
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
