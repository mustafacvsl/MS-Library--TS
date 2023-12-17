import { inject, injectable } from 'inversify';
import { IAuthorModel, IAuthor } from '../User/AuthEntity';
import { ExecutiveRepository } from './ExecutiveRepository ';
import MemberEntity from '../Member/MemberEntity';
import ReturnedEntity, { IReturnedModel } from '../Returned/ReturnedEntity';
import BookEntity from '../Book/BookEntity';
import LoanedEntity from '../Loaned/LoanedEntity';

const FINE_RATE_PER_DAY = 0.5;

@injectable()
class ExecutiveService {
    constructor(@inject(ExecutiveRepository) private executiverepository: ExecutiveRepository) {}
    async borrowBook(memberId: string, bookId: string, dueDate: string): Promise<any> {
        const borrowedBook = await this.executiverepository.borrowBook(memberId, bookId, dueDate);
        const member = await MemberEntity.findById(memberId);
        const book = await BookEntity.findById(bookId);

        if (!member || !book) {
            throw new Error('Member or book not found');
        }

        return { borrowedBook, member, book };
    }

    async listUsers(): Promise<IAuthorModel[]> {
        return this.executiverepository.listUsers();
    }

    async updateUser(userId: string, updateData: Partial<IAuthor>): Promise<IAuthorModel | null> {
        return this.executiverepository.updateUser(userId, updateData);
    }

    async deleteUser(userId: string): Promise<void> {
        return this.executiverepository.deleteUser(userId);
    }

    async returnBook(loanedId: string, returnedDate: string): Promise<IReturnedModel | null> {
        const returnedBook = await this.executiverepository.returnBook(loanedId, returnedDate);

        const loanedInfo = await LoanedEntity.findById(loanedId);
        const dueDate = loanedInfo?.dueDate;

        if (dueDate) {
            const returnedDateObj = new Date(returnedDate);
            const daysDifference = Math.floor((returnedDateObj.getTime() - dueDate.getTime()) / (1000 * 3600 * 24));

            if (daysDifference <= 15) {
                return returnedBook;
            } else {
                const memberId = loanedInfo?.memberId;
                const fineAmount = daysDifference * FINE_RATE_PER_DAY;

                await MemberEntity.findByIdAndUpdate(memberId, { $inc: { fineAmount: fineAmount } });

                throw new Error(`Book returned late! Fine applied. Please pay your debts.`);
            }
        } else {
            throw new Error(`Loan information not found.`);
        }
    }
}

export default ExecutiveService;
