import mongoose, { Document, Schema } from 'mongoose';
import memberEntity, { IMember } from '../Member/member.entity';
import Book, { IBook } from '../Book/Book';
export interface ILoaned {
    memberId: IMember;
    bookId: IBook;
    borrowedDate: Date;
    returnedDate?: Date;
}

export interface ILoanedModel extends ILoaned, Document {}

const LoanedSchema: Schema = new Schema(
    {
        memberId: { type: String, required: true, unique: true, ref: 'Member' },
        bookId: { type: String, required: true, unique: true, ref: 'Book' },
        borrowedDate: { type: Date, required: true },
        returnedDate: { type: Date, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<ILoanedModel>('Loaned', LoanedSchema);
