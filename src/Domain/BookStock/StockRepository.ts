import StockEntity, { IStockModel } from './Stock.entity';
import { injectable } from 'inversify';

@injectable()
class StockRepository {
    async getStock(): Promise<IStockModel[]> {
        const stock: IStockModel[] = await StockEntity.find();
        return stock;
    }
}

export default StockRepository;
