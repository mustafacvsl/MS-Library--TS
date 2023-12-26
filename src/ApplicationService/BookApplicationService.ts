import BookService from '../Domain/Book/BookService';
import StockService from '../Domain/BookStock/StockService';
import { inject, injectable } from 'inversify';
import { IBookModel } from '../Domain/Book/BookEntity';
import LocationService from '../Domain/BookLocation/LocationService';

@injectable()
export class BookApplicationService {
    private bookService: BookService;
    private stockService: StockService;
    private locationService: LocationService;

    constructor(@inject(BookService) bookService: BookService, @inject(StockService) stockService: StockService, @inject(LocationService) locationService: LocationService) {
        this.bookService = bookService;
        this.stockService = stockService;
        this.locationService = locationService;
    }

    async createBook(bookData: any): Promise<IBookModel> {
        const createdBook: IBookModel = await this.bookService.createBook(bookData);

        const stockData = bookData.stock;
        const locationData = bookData.location;

        if (stockData) {
            await this.stockService.createStock(createdBook._id, stockData.count);
        }

        if (locationData) {
            await this.locationService.createLocation(createdBook._id, locationData);
        }

        return createdBook;
    }

    async updateBook(bookId: string, updates: any): Promise<IBookModel | null> {
        return this.bookService.updateBook(bookId, updates);
    }

    async deleteBook(bookId: string): Promise<IBookModel | null> {
        return this.bookService.deleteBook(bookId);
    }

    async getAllBooks(): Promise<IBookModel[]> {
        return this.bookService.getAllBooks();
    }
}

export default BookApplicationService;
