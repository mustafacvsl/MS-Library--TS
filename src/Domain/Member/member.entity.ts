import mongoose, { Document, Schema } from 'mongoose';
import authEntity, { IAuthor } from '../User/auth.entity';

export interface IMember {
    authorname: IAuthor;
    email: string;
}

export interface IMemberModel extends IMember, Document {}

const MemberSchema: Schema = new Schema(
    {
        authorname: { type: String, required: true, ref: 'Author' },
        email: { type: String, required: true, unique: true, ref: 'Author' }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IMemberModel>('Member', MemberSchema);
