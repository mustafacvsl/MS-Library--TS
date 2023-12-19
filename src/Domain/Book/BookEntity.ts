import mongoose, { Document, Schema } from 'mongoose';
import { IBookLocation } from '../BookLocation/BookLocation';

export interface IBook {
    title: string;
    author: string;
    stock: number;
    location: IBookLocation;
    status: string;
}

export interface IBookModel extends IBook, Document {}

const BookSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        stock: { type: Number, ref: 'Stock', required: true },
        location: {
            corridor: { type: String, required: true },
            shelf: { type: String, required: true },
            cupboard: { type: String, required: true }
        },
        status: { type: String, enum: ['Available', 'Borrowed'], default: 'Available' }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IBookModel>('Book', BookSchema);
