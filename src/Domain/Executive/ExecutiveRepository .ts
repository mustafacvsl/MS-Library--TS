import mongoose, { ClientSession, Types } from 'mongoose';
import loanedEntity from '../Loaned/LoanedEntity';
import AuthRepository from '../User/AuthRepository';
import Book from '../Book/BookEntity';
import authEntity, { IAuthorModel, IAuthor } from '../User/AuthEntity';

export class ExecutiveRepository {
    private client: mongoose.Mongoose;
    private databaseName: string;
    private authrepository: AuthRepository;

    constructor() {
        this.client = mongoose;
        this.databaseName = 'library';
        this.authrepository = new AuthRepository();
    }

    async borrowBook(memberId: string, bookId: string, session: ClientSession): Promise<any> {
        const loaned = new loanedEntity({
            memberId,
            bookId
        });

        await loaned.save({ session });

        await Book.findByIdAndUpdate(bookId, { status: 'Borrowed' }, { session });
        console.log(loaned);

        return loaned.save();
    }

    async updateUser(userId: string, updates: Partial<IAuthorModel>): Promise<IAuthorModel | null> {
        return authEntity.findByIdAndUpdate(userId, updates, { new: true }).exec();
    }

    async deleteUser(userId: string): Promise<IAuthorModel | null> {
        return authEntity.findByIdAndDelete(userId).exec();
    }

    async getAllUsers(): Promise<IAuthorModel[]> {
        return authEntity.find({}).exec();
    }

    async getUserById(userId: string): Promise<IAuthorModel | null> {
        return authEntity.findById(userId).exec();
    }
}
