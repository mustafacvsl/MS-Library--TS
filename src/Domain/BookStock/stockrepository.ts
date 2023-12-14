import Stock, { IStockModel } from './Stock.entity';
import { injectable } from 'inversify';
import { errorHandlerMiddleware } from '../../middleware/ErrorHandlerMiddleware';

@injectable()
class StockRepository {
    async createStock(stockData: { stockProperty: string }): Promise<IStockModel> {
        const newStock = await Stock.create({
            stockProperty: stockData.stockProperty
        });
        return newStock.save();
    }
}

export default StockRepository;
