import mongoose, { Document, Schema } from 'mongoose';

export interface IStock {
    count: string;
}

export interface IStockModel extends IStock, Document {}

const StockSchema: Schema = new Schema({
    count: { type: String, required: true, default: 0 }
});

export default mongoose.model<IStockModel>('Stock', StockSchema);
