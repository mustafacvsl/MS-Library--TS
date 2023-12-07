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
}

export default ExecutiveService;
