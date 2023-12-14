import mongoose, { Document, Schema } from 'mongoose';
import LoanedEntity, { ILoaned, ILoanedModel } from '../Loaned/LoanedEntity';

export interface IReturned {
    LoanedId: ILoaned;
    returnedDate: Date;
}

export interface IReturnedModel extends IReturned, Document {}

const ReturnedSchema: Schema = new Schema(
    {
        loanedId: { type: Schema.Types.ObjectId, required: true, ref: 'Loaned' },
        returnedDate: { type: Date, required: true, ref: 'Loaned' }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IReturnedModel>('Returned', ReturnedSchema);
