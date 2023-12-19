import LoanedEntity, { ILoaned, ILoanedModel } from '../Loaned/LoanedEntity';
import AuthEntity, { IAuthorModel, IAuthor } from '../User/AuthEntity';
import { injectable, inject } from 'inversify';
import ReturnedEntity, { IReturnedModel } from '../Returned/ReturnedEntity';
import BookRepository from '../Book/BookRepository';

@injectable()
export class ExecutiveRepository {
    constructor() {}
    async borrowBook(memberId: string, bookId: string, dueDate: string): Promise<ILoanedModel | null> {
        const newLoan = new LoanedEntity({
            memberId: memberId,
            bookId: bookId,
            dueDate: new Date(dueDate)
        });

        const savedLoan = await newLoan.save();

        return savedLoan;
    }

    async listUsers(): Promise<IAuthorModel[]> {
        const users = await AuthEntity.find();

        return users;
    }

    async updateUser(userId: string, updates: any): Promise<IAuthorModel | null> {
        const updatedUser: IAuthorModel | null = await AuthEntity.findByIdAndUpdate(userId, updates, { new: true });
        if (!updatedUser) {
            throw new Error('user not found');
        }
        return updatedUser;
    }

    async deleteUser(userId: string): Promise<void> {
        await AuthEntity.findByIdAndDelete(userId);
    }

    async returnBook(loanedId: string, returnedDate: string): Promise<IReturnedModel | null> {
        const returnedEntity = new ReturnedEntity({
            loanedId: loanedId,
            returnedDate: new Date(returnedDate)
        });

        const savedReturned = await returnedEntity.save();
        return savedReturned;
    }
}
