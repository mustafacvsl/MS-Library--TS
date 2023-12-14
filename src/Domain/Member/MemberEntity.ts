import mongoose, { Document, Schema } from 'mongoose';
import authEntity, { IAuthor } from '../User/AuthEntity';

export interface IMember {
    name: IAuthor;
    email: IAuthor;
    bookBorrowed: string | null;
    penalty: number;
}

export interface IMemberModel extends IMember, Document {}

const MemberSchema: Schema = new Schema(
    {
        name: { type: String, required: true, ref: 'Author' },
        email: { type: String, required: true, unique: true, ref: 'Author' },
        bookBorrowed: { type: Schema.Types.ObjectId, default: null, ref: 'Loaned' },
        penalty: { type: Number, default: 0 }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IMemberModel>('Member', MemberSchema);
