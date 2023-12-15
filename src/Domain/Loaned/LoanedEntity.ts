import mongoose, { Document, Schema } from 'mongoose';

export interface ILoaned {
    memberId: string;
    bookId: string;
    dueDate: Date;
    returnedDate?: Date;
}

export interface ILoanedModel extends ILoaned, Document {}

const LoanedSchema: Schema = new Schema(
    {
        memberId: { type: Schema.Types.ObjectId, required: true, ref: 'Member' },
        bookId: { type: Schema.Types.ObjectId, required: true, ref: 'Book' },
        dueDate: { type: Date, required: true },
        returnedDate: { type: Date }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<ILoanedModel>('Loaned', LoanedSchema);
