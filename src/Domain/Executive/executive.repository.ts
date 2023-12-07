import mongoose, { ClientSession, Types } from 'mongoose';
import loanedEntity from '../Loaned/loaned.entity';
import AuthRepository from '../User/Auth.repository';

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

        return await loaned.save({ session });
    }
}
