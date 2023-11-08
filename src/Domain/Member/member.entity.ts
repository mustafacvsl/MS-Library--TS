import mongoose, { Document, Schema } from 'mongoose';
import authEntity, { IAuthor } from '../User/auth.entity';

export interface IMember {
    userId: string;
    email: string;
}

export interface IMemberModel extends IMember, Document {}

const MemberSchema: Schema = new Schema(
    {
        userId: { type: String, required: true, ref: 'Author' },
        email: { type: String, required: true, unique: true, ref: 'Author' }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IMemberModel>('Member', MemberSchema);
