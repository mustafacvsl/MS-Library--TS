import StockRepository from './StockRepository';
import { inject, injectable } from 'inversify';
import StockEntity, { IStockModel } from './Stock.entity';

@injectable()
export class StockService {
    private stockRepository: StockRepository;

    constructor(@inject(StockRepository) stockRepository: StockRepository) {
        this.stockRepository = stockRepository;
    }

    async createStock(stockData: any): Promise<IStockModel> {
        return this.stockRepository.createStock(stockData);
    }
}

export default StockService;
