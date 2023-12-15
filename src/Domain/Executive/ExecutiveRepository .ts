import loanedEntity from '../Loaned/LoanedEntity';
import Book from '../Book/BookEntity';
import AuthEntity, { IAuthorModel, IAuthor } from '../User/AuthEntity';
import { injectable } from 'inversify';
import ReturnedEntity from '../Returned/ReturnedEntity';

@injectable()
export class ExecutiveRepository {
    constructor() {}
    async borrowBook(memberId: string, bookId: string, dueDate: Date): Promise<void> {
        const loaned = new loanedEntity({
            memberId,
            bookId,
            dueDate,
            returnedDate: null
        });
        console.log(loaned);

        await loaned.save();

        await Book.findByIdAndUpdate(bookId, { status: 'Borrowed' }, {});
    }

    async returnBook(loanedId: string): Promise<void> {
        const returned = new ReturnedEntity({
            loanedId,
            returnedDate: new Date()
        });

        await returned.save();

        await Book.findByIdAndUpdate(Book, { status: 'Returned' }, {});
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
}
