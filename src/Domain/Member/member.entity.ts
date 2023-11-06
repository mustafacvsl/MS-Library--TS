import mongoose, { Document, Schema } from 'mongoose';
import Author, { IAuthor } from '../User/auth.entity';
import Book, { IBook } from '../Book/Book';

export interface ILoaned {
    userId: IAuthor;
    email: string;
    bookId: IBook;
}

export interface IMemberModel extends ILoaned, Document {}

const MemberSchema: Schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
        email: { type: String, required: true },

        book_Id: { type: String, ref: 'Book' }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IMemberModel>('Member', MemberSchema);
