import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ILoanedModel extends Document {
    memberId: Types.ObjectId;
    bookId: Types.ObjectId;
    borrowedDate: Date;
    returnedDate: Date | null;
}

const LoanedSchema = new Schema({
    memberId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    borrowedDate: { type: Date, required: true },
    returnedDate: { type: Date, default: null }
});

const LoanedEntity = mongoose.model<ILoanedModel>('Loaned', LoanedSchema);

export default LoanedEntity;
