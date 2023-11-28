import { inject, injectable } from 'inversify';
import { errorHandlerMiddleware } from '../../middleware/errorhandlerMiddleware';
import { handleResponse } from '../../infrastructure/response';
import { addDays } from 'date-fns';
import { ClientSession } from 'mongoose';
import ExecutiveRepository from './executive.repository';

@injectable()
class ExecutiveService {
    constructor(@inject(ExecutiveRepository) private executiverepository: ExecutiveRepository) {}

    @errorHandlerMiddleware
    async listUsers(): Promise<any> {
        return this.executiverepository.getAllUsers();
    }

    @errorHandlerMiddleware
    async updateAuthor(authorId: string, updatedAuthorInfo: any): Promise<any> {
        return this.executiverepository.updateUserById(authorId, updatedAuthorInfo);
    }

    @errorHandlerMiddleware
    async deleteAuthor(authorId: string): Promise<any> {
        return this.executiverepository.deleteUserById(authorId);
    }

    @errorHandlerMiddleware
    async borrowBook(memberId: string, bookId: string, session: ClientSession): Promise<any> {
        return this.executiverepository.borrowBook(memberId, bookId, session);
    }

    @errorHandlerMiddleware
    async returnBook(loanId: string, session: ClientSession): Promise<any> {
        return this.executiverepository.returnBook(loanId, session);
    }
}

export default ExecutiveService;
