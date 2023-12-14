import mongoose, { ClientSession, Types } from 'mongoose';
import loanedEntity from '../Loaned/LoanedEntity';
import AuthRepository from '../User/AuthRepository';
import Book from '../Book/BookEntity';
import AuthEntity, { IAuthorModel, IAuthor } from '../User/AuthEntity';
import { injectable } from 'inversify';

@injectable()
export class ExecutiveRepository {
    private client: mongoose.Mongoose;
    private databaseName: string;
    private authrepository: AuthRepository;

    constructor() {
        this.client = mongoose;
        this.databaseName = 'library';
        this.authrepository = new AuthRepository();
    }
    async borrowBook(memberId: string, bookId: string, dueDate: Date): Promise<void> {
        const loaned = new loanedEntity({
            memberId,
            bookId,
            dueDate
        });
        console.log(loaned);

        await loaned.save();

        await Book.findByIdAndUpdate(bookId, { status: 'Borrowed' }, {});
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
