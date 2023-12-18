import { injectable } from 'inversify';

import BookEntity from '../Book/BookEntity';

@injectable()
class StockService {
    constructor() {}

    async decreaseStock(bookId: string): Promise<void> {
        const book = await BookEntity.findById(bookId);

        if (!book) {
            throw new Error('Book not found');
        }

        if (book.stock.count <= 0) {
            throw new Error('Stock is not available');
        }

        await BookEntity.findByIdAndUpdate(bookId, { $inc: { 'stock.count': -1 } });
    }

    async increaseStock(bookId: string): Promise<void> {
        const book = await BookEntity.findById(bookId);

        if (!book) {
            throw new Error('Book not found');
        }

        const newStockCount = parseInt(book.stock.count) + 1;

        await BookEntity.findByIdAndUpdate(bookId, { $set: { 'stock.count': newStockCount } });
    }
}

export default StockService;
