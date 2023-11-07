import mongoose, { Document, Schema } from 'mongoose';
import memberEntity, { IMember } from '../../Member/member.entity';
import Book, { IBook } from '../../Book/Book';

export interface ILoaned {
    memberId: string;
    bookId: string;
    borrowedDate: Date;
}

export interface ILoanedModel extends ILoaned, Document {}

const LoanedSchema = new Schema({
    memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    borrowedDate: { type: Date, default: Date.now }
});

export default mongoose.model<ILoanedModel>('Loaned', LoanedSchema);
