import mongoose, { Document, Schema } from 'mongoose';
import memberEntity, { IMember } from '../Member/member.entity';
import Book, { IBook } from '../Book/Book';

export interface ILoaned {
    memberId: IMember;
    bookId: IBook;
    borrowedDate: string;
    returnedDate?: string;
    penaltyApplied?: boolean;
}

export interface ILoanedModel extends ILoaned, Document {}

const LoanedSchema: Schema = new Schema(
    {
        memberId: { type: Schema.Types.ObjectId, required: true, ref: 'Member' },
        bookId: { type: Schema.Types.ObjectId, required: true, ref: 'Book' },
        borrowedDate: { type: String, required: true },
        returnedDate: { type: String },
        penaltyApplied: { type: Boolean }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<ILoanedModel>('Loaned', LoanedSchema);
