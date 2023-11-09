import ExecutiveRepository from '../Domain/Executive/executive.repository';
import ExecutiveService from '../Domain/Executive/executive.service';
import authEntity from '../Domain/User/auth.entity';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import loanedEntity, { ILoaned, ILoanedModel } from '../Domain/Loaned/loaned.entity';

@injectable()
export class ExecutiveApplicationService {
    constructor(@inject(ExecutiveService) private executiveservice: ExecutiveService) {}

    async listUsers() {
        const users = await authEntity.find({}, 'name email');
        return { users };
    }

    async updateAuthor(authorId: string, updateData: any) {
        const author = await authEntity.findByIdAndUpdate(authorId, updateData, { new: true });

        if (!author) {
            throw new Error('Author not found');
        }

        return { author };
    }

    async deleteAuthor(authorId: string) {
        const author = await authEntity.findByIdAndDelete(authorId);

        if (!author) {
            throw new Error('Author not found');
        }

        return { author, message: 'Deleted' };
    }

    async borrowBook(memberId: string, bookId: string): Promise<ILoanedModel | null> {
        const loanedBook = await this.executiveservice.borrowBook(memberId, bookId);
        return loanedBook;
    }

    async returnBook(loanId: string): Promise<ILoanedModel | null> {
        const returnedBook = await this.executiveservice.returnBook(loanId);
        return returnedBook;
    }
}

export default ExecutiveApplicationService;
