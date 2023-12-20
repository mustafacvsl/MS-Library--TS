import StockService from '../Domain/BookStock/StockService';
import { inject, injectable } from 'inversify';
import StockEntity, { IStockModel } from '../Domain/BookStock/Stock.entity';

@injectable()
export class StockApplicationService {
    private stockService: StockService;

    constructor(@inject(StockService) stockService: StockService) {
        this.stockService = stockService;
    }

    async createStock(count: number): Promise<IStockModel | null> {
        return this.stockService.createStock(count);
    }
}

export default StockApplicationService;
