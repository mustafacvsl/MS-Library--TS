import StockRepository from './StockRepository';
import { inject, injectable } from 'inversify';
import { IStockModel } from './StockEntity';
import Book, { IBookModel } from '../Book/BookEntity';

@injectable()
export class StockService {
    private stockRepository: StockRepository;

    constructor(@inject(StockRepository) stockRepository: StockRepository) {
        this.stockRepository = stockRepository;
    }

    async createStock(stockData: string): Promise<IStockModel> {
        return this.stockRepository.createStock(stockData);
    }

    async updateStock(bookId: string, count: number): Promise<IBookModel | null> {
        const updatedBook = await Book.findByIdAndUpdate(bookId, { $inc: { 'stock.count': count } }, { new: true });

        return updatedBook;
    }
}

export default StockService;
