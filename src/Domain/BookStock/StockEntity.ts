import mongoose, { Document, Schema } from 'mongoose';

export interface IStock {
    count: number;
    bookId: mongoose.Types.ObjectId;
}

export interface IStockModel extends IStock, Document {}

const StockSchema: Schema = new Schema({
    count: { type: Number, required: true, default: 0 },
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true }
});

export default mongoose.model<IStockModel>('Stock', StockSchema);
