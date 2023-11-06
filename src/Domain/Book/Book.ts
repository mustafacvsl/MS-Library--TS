import mongoose, { Document, Schema } from 'mongoose';
import Stock, { IStock } from './Stock.entity';
import BookLocation, { IBookLocation } from './BookLocation';

export interface IBook {
    title: string;
    author: string;
    stock: IStock;
    location: IBookLocation;
}

export interface IBookModel extends IBook, Document {}

const BookSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        stock: { type: Number, ref: 'Stock', required: true },
        location: { type: String, required: true, ref: 'BookLocation' }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IBookModel>('Book', BookSchema);