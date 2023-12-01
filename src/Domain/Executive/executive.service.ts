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
        return this.executiverepository.listUsers();
    }

    @errorHandlerMiddleware
    async updateUsers(userId: string, data: any): Promise<any> {
        return this.executiverepository.updateUsers(userId, data);
    }

    @errorHandlerMiddleware
    async deleteUsers(userId: string): Promise<any> {
        return this.executiverepository.deleteUsers(userId);
    }

    @errorHandlerMiddleware
    async borrowBook(memberId: string, bookId: string, borrowedDate: Date, returnedDate: Date, session: ClientSession): Promise<any> {
        return this.executiverepository.borrowBookWithPenalty(memberId, bookId, borrowedDate, returnedDate, session);
    }

    @errorHandlerMiddleware
    async returnBook(loanId: string, session: ClientSession): Promise<any> {
        return this.executiverepository.returnBook(loanId, session);
    }
}

export default ExecutiveService;
