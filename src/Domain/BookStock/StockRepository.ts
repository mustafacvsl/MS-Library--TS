import StockEntity, { IStockModel } from './StockEntity';
import { injectable } from 'inversify';

@injectable()
class StockRepository {
    async createStock(stockData: string): Promise<IStockModel> {
        const newStock: IStockModel = new StockEntity(stockData);
        return newStock.save();
    }

    async updateStock(bookId: string, count: number): Promise<IStockModel | null> {
        const updatedStock = await StockEntity.findOneAndUpdate({ bookId: bookId }, { $inc: { count: count } }, { new: true, upsert: true });

        return updatedStock;
    }
}

export default StockRepository;
