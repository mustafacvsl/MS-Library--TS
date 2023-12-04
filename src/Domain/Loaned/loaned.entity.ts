import mongoose, { Document, Schema, Types } from 'mongoose';
import memberEntity, { IMember, IMemberModel } from '../Member/member.entity';
import Book, { IBook, IBookModel } from '../Book/Book';

export interface ILoanedModel extends Document {
    memberId: IMember;
    bookId: IBook;
    borrowedDate: Date;
    returnedDate: Date | null;
}

const LoanedSchema = new Schema({
    memberId: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    borrowedDate: { type: Date, required: true },
    returnedDate: { type: Date, default: null }
});

const LoanedEntity = mongoose.model<ILoanedModel>('Loaned', LoanedSchema);

export default LoanedEntity;
