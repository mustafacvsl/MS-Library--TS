import { inject, injectable } from 'inversify';
import { ClientSession } from 'mongoose';
import { errorHandlerMiddleware } from '../../middleware/errorhandlerMiddleware';
import ExecutiveRepository from './executive.repository';
import Book, { IBookModel } from '../Book/Book';

@injectable()
export class ExecutiveService {
    private executiveRepository: ExecutiveRepository;

    constructor(@inject(ExecutiveRepository) executiveRepository: ExecutiveRepository) {
        this.executiveRepository = executiveRepository;
    }

    @errorHandlerMiddleware
    async borrowBook(memberId: string, bookId: string, session: ClientSession): Promise<IBookModel | null> {
        return this.executiveRepository.borrowBook(memberId, bookId, session);
    }

    @errorHandlerMiddleware
    async returnBook(loanId: string, session: ClientSession): Promise<any> {
        return this.executiveRepository.returnBook(loanId, session);
    }
}

export default ExecutiveService;
