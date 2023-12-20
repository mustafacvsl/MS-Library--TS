import BookLocationService from '../Domain/BookLocation/BookLocationService';
import { inject, injectable } from 'inversify';
import { IBookLocationModel } from '../Domain/BookLocation/BookLocation';

@injectable()
export class BookLocationApplicationService {
    private bookLocationService: BookLocationService;

    constructor(@inject(BookLocationService) bookLocationService: BookLocationService) {
        this.bookLocationService = bookLocationService;
    }

    async createBookLocation(locationDetails: { corridor: string; shelf: string; cupboard: string }): Promise<IBookLocationModel | null> {
        return this.bookLocationService.createBookLocation(locationDetails);
    }
}

export default BookLocationApplicationService;
