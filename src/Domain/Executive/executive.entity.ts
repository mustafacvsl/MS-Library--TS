import mongoose, { Document, Schema } from 'mongoose';

export interface IAdmin {
    memberId: string;
    member_email: string;
}

export interface IAdminModel extends IAdmin, Document {}

const AdminSchema: Schema = new Schema(
    {
        memberId: { type: String, required: true, unique: true, ref: 'Member' },
        member_email: { type: String, required: true, unique: true, ref: 'Member' }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IAdminModel>('Executive', AdminSchema);
