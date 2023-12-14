import mongoose, { Document, Schema } from 'mongoose';
import memberEntity, { IMember } from '../Member/MemberEntity';
import Book, { IBook } from '../Book/BookEntity';

export interface ILoaned {
    memberId: IMember;
    bookId: IBook;
    dueDate: Date;
}

export interface ILoanedModel extends ILoaned, Document {}

const LoanedSchema: Schema = new Schema(
    {
        memberId: { type: Schema.Types.ObjectId, required: true, ref: 'Member' },
        bookId: { type: Schema.Types.ObjectId, required: true, ref: 'Book' },
        dueDate: { type: Date, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<ILoanedModel>('Loaned', LoanedSchema);
