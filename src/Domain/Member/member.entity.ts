import mongoose, { Document, Schema } from 'mongoose';

export interface IMember {
    authorname: string;
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
