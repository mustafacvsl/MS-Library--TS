import mongoose, { Document, Schema } from 'mongoose';

export interface IAdmin {
    book_id: string;
    member_id: string;
}

export interface IAdminModel extends IAdmin, Document {}

const AdminSchema: Schema = new Schema(
    {
        book_id: { type: String, required: true, ref: 'Author' },
        member_id: { type: String, required: true, unique: true, ref: 'Books' }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IAdminModel>('Executive', AdminSchema);
