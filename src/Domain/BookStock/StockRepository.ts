import StockEntity, { IStockModel } from './Stock.entity';
import { injectable } from 'inversify';

@injectable()
class StockRepository {
    async createStock(stockData: { count: number }): Promise<IStockModel> {
        const newStock: IStockModel = new StockEntity(stockData);
        return newStock.save();
    }
}

export default StockRepository;
