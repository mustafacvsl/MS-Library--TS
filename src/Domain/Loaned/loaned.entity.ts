import mongoose, { Document, Schema } from 'mongoose';

export interface ILoanedModel extends Document {
    memberId: string;
    bookId: string;
    borrowedDate: Date;
    returnedDate: Date | null;
    penalty: number;
}

const LoanedSchema = new Schema({
    memberId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    borrowedDate: { type: Date, required: true },
    returnedDate: { type: Date, default: null },
    penalty: { type: Number, default: 0 }
});

const LoanedEntity = mongoose.model<ILoanedModel>('Loaned', LoanedSchema);

export default LoanedEntity;
