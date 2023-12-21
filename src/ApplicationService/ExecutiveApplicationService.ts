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
import LoanedService from '../Domain/Loaned/LoanedService';
import ReturnedService from '../Domain/Returned/ReturnedService';
import { Result } from '../infrastructure/Result';

const Penalties = 5;

@injectable()
export class ExecutiveApplicationService {
    constructor(
        @inject(ExecutiveService) private executiveservice: ExecutiveService,
        @inject(BookRepository) private bookRepository: BookRepository,
        @inject(LoanedService) private loanedService: LoanedService,
        @inject(ReturnedService) private returnedService: ReturnedService
    ) {}

    async borrowBook(memberId: string, bookId: string, dueDate: string): Promise<Result<ILoanedModel | null>> {
        const member = await MemberEntity.findById(memberId);
        const book = await BookEntity.findById(bookId);

        if (!member || !book) {
            return {
                success: false,
                error: {
                    message: 'Member or book not found'
                }
            };
        }

        await this.bookRepository.updateBookStatus(bookId, 'Borrowed');

        const loanedData = {
            memberId: memberId,
            bookId: bookId,
            dueDate: new Date(dueDate)
        };

        return this.loanedService.createLoaned(loanedData);
    }

    async returnBook(loanedId: string, returnedDate: string): Promise<Result<IReturnedModel | null>> {
        const returnedBook = await this.executiveservice.returnBook(loanedId, returnedDate);
        const loanedInfo = await LoanedEntity.findById(loanedId);
        const dueDate = loanedInfo?.dueDate;

        if (!dueDate) {
            return {
                success: false,
                error: {
                    message: 'Loan information not found.'
                }
            };
        }

        const returnedDateObj = new Date(returnedDate);
        const daysDifference = Math.floor((returnedDateObj.getTime() - dueDate.getTime()) / (1000 * 3600 * 24));

        if (daysDifference <= 15) {
            return { success: true, data: returnedBook };
        }

        const memberId = loanedInfo?.memberId;
        const fineAmount = daysDifference * Penalties;

        await MemberEntity.findByIdAndUpdate(memberId, { $inc: { fineAmount: fineAmount } });

        const returnedData = {
            loanedId: loanedId,
            returnedDate: new Date(returnedDate)
        };

        return this.returnedService.createReturned(returnedData);
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
