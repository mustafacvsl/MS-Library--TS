import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import ExecutiveService from '../Domain/Executive/ExecutiveService';
import { IAuthorModel } from '../Domain/User/AuthEntity';
import { ILoanedModel } from '../Domain/Loaned/LoanedEntity';
import { IReturnedModel } from '../Domain/Returned/ReturnedEntity';
import MemberEntity from '../Domain/Member/MemberEntity';
import BookEntity from '../Domain/Book/BookEntity';
import BookRepository from '../Domain/Book/BookRepository';
import LoanedEntity from '../Domain/Loaned/LoanedEntity';

const Penalties = 5;

@injectable()
export class ExecutiveApplicationService {
    constructor(@inject(ExecutiveService) private executiveservice: ExecutiveService, @inject(BookRepository) private bookRepository: BookRepository) {}

    async borrowBook(memberId: string, bookId: string, dueDate: string): Promise<ILoanedModel | null> {
        const member = await MemberEntity.findById(memberId);
        const book = await BookEntity.findById(bookId);

        if (!member || !book) {
            throw new Error('Member or book not found');
        }

        await this.bookRepository.updateBookStatus(bookId, 'Borrowed');
        return this.executiveservice.borrowBook(memberId, bookId, dueDate);
    }

    async returnBook(loanedId: string, returnedDate: string): Promise<IReturnedModel | null> {
        const returnedBook = await this.executiveservice.returnBook(loanedId, returnedDate);

        const loanedInfo = await LoanedEntity.findById(loanedId);

        const dueDate = loanedInfo?.dueDate;

        if (dueDate) {
            const returnedDateObj = new Date(returnedDate);
            const daysDifference = Math.floor((returnedDateObj.getTime() - dueDate.getTime()) / (1000 * 3600 * 24));

            if (daysDifference <= 15) {
                return returnedBook;
            } else {
                const memberId = loanedInfo?.memberId;
                const fineAmount = daysDifference * Penalties;

                await MemberEntity.findByIdAndUpdate(memberId, { $inc: { fineAmount: fineAmount } });

                throw new Error(`Book returned late! Fine applied. Please pay your debts.`);
            }
        } else {
            throw new Error(`Loan information not found.`);
        }
    }

    async listUsers(): Promise<IAuthorModel[]> {
        return this.executiveservice.listUsers();
    }

    async updateUser(userId: string, updates: any): Promise<IAuthorModel | null> {
        return this.executiveservice.updateUser(userId, updates);
    }

    async deleteUser(userId: string): Promise<void> {
        return this.executiveservice.deleteUser(userId);
    }
}
