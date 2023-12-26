import mongoose, { Document, Schema } from 'mongoose';

export interface IBookLocation {
    corridor: string;
    shelf: string;
    cupboard: string;
    bookId: mongoose.Types.ObjectId;
}

export interface IBookLocationModel extends IBookLocation, Document {}

const BookLocationSchema: Schema = new Schema(
    {
        corridor: { type: String, required: true },
        shelf: { type: String, required: true },
        cupboard: { type: String, required: true },
        bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true }
    },
    {}
);

export default mongoose.model<IBookLocationModel>('BookLocation', BookLocationSchema);
