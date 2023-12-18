import mongoose, { Document, Schema } from 'mongoose';
import Stock, { IStock } from '../BookStock/Stock.entity';
import BookLocation, { IBookLocation } from '../BookLocation/BookLocation';
import { number, string } from 'joi';

export interface IBook {
    title: string;
    author: string;
    stock: IStock;
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
