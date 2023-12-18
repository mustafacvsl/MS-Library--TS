import LoanedEntity, { ILoaned, ILoanedModel } from '../Loaned/LoanedEntity';
import AuthEntity, { IAuthorModel, IAuthor } from '../User/AuthEntity';
import { injectable } from 'inversify';
import BookEntity from '../Book/BookEntity';
import ReturnedEntity, { IReturnedModel } from '../Returned/ReturnedEntity';
import MemberEntity from '../Member/MemberEntity';

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

    async updateUser(userId: string, updateData: Partial<IAuthor>): Promise<IAuthorModel | null> {
        const user = await AuthEntity.findByIdAndUpdate(userId, updateData, { new: true });

        return user;
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

    async updateStock(bookId: string, countChange: number): Promise<void> {
        const book = await BookEntity.findById(bookId);
        if (!book) {
            throw new Error('Book not found');
        }

        const newStockCount = book.stock.count + countChange;

        await BookEntity.findByIdAndUpdate(bookId, { 'stock.count': newStockCount });
    }
}
