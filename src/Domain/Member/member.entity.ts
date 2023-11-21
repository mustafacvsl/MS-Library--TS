import mongoose, { Document, Schema } from 'mongoose';
import authEntity, { IAuthor } from '../User/auth.entity';

export interface IMember {
    name: IAuthor;
    email: IAuthor;
}

export interface IMemberModel extends IMember, Document {}

const MemberSchema: Schema = new Schema(
    {
        name: { type: String, required: true, ref: 'Author' },
        email: { type: String, required: true, unique: true, ref: 'Author' }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IMemberModel>('Member', MemberSchema);
