import mongoose, { Document, Schema } from 'mongoose';
import memberEntity, { IMember } from '../../Member/member.entity';
import Book, { IBook } from '../../Book/Book';

export interface ILoaned {
    memberId: IMember;
    bookId: IBook;
}

export interface ILoanedModel extends ILoaned, Document {}

const LoanedSchema: Schema = new Schema(
    {
        memberId: { type: String, required: true, ref: 'Author' },
        bookId: { type: String, required: true, ref: 'Book' }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<ILoanedModel>('Loaned', LoanedSchema);
