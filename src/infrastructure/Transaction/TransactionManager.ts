import { injectable } from 'inversify';
import mongoose, { ClientSession } from 'mongoose';

@injectable()
export default class TransactionHandler {
    private client: mongoose.Mongoose;

    constructor() {
        this.client = mongoose;
    }

    async runInTransaction(callback: (session: ClientSession) => Promise<void>): Promise<void> {
        const session = await this.client.startSession();
        session.startTransaction();

        try {
            await callback(session);
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }
}
