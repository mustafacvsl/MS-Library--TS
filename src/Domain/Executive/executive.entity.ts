import mongoose, { Document, Schema } from 'mongoose';
import memberEntity, { IMember } from '../Member/member.entity';

export interface IExecutive {
    memberId: IMember;
    member_email: IMember;
}

export interface IExecutiveModel extends IExecutive, Document {}

const ExecutiveSchema: Schema = new Schema(
    {
        memberId: { type: String, required: true, unique: true, ref: 'Member' },
        member_email: { type: String, required: true, unique: true, ref: 'Member' }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IExecutiveModel>('Executive', ExecutiveSchema);
