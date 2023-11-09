import mongoose, { Document, Schema } from 'mongoose';

export interface IStock {
    count: number;
}

export interface IStockModel extends IStock, Document {}

const StockSchema: Schema = new Schema({
    count: { type: Number, required: true, default: 0 }
});

export default mongoose.model<IStockModel>('Stock', StockSchema);