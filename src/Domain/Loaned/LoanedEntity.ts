import mongoose, { Document, Schema } from 'mongoose';
import MemberEntity, { IMember } from '../Member/MemberEntity';
import BookEntity, { IBook } from '../Book/BookEntity';
export interface ILoaned {
    memberId: IMember;
    bookId: IBook;
    dueDate: Date;
}

export interface ILoanedModel extends ILoaned, Document {}

const LoanedSchema: Schema = new Schema(
    {
        memberId: { type: String, required: true, ref: 'Member' },
        bookId: { type: String, required: true, ref: 'Book' },
        dueDate: { type: Date, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<ILoanedModel>('Loaned', LoanedSchema);
