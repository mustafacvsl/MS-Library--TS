import StockRepository from './StockRepository';
import { inject, injectable } from 'inversify';
import { IStockModel } from './StockEntity';
import Book, { IBookModel } from '../Book/BookEntity';
import mongoose from 'mongoose';

@injectable()
export class StockService {
    private stockRepository: StockRepository;

    constructor(@inject(StockRepository) stockRepository: StockRepository) {
        this.stockRepository = stockRepository;
    }

    async createStock(bookId: string, count: number): Promise<IStockModel> {
        const stockData = {
            bookId: new mongoose.Types.ObjectId(bookId),
            count: count
        };

        return this.stockRepository.createStock(stockData);
    }

    async updateStock(bookId: string, count: number): Promise<IBookModel | null> {
        const updatedBook = await Book.findByIdAndUpdate(bookId, { $inc: { 'stock.count': count } }, { new: true });

        return updatedBook;
    }
}

export default StockService;
