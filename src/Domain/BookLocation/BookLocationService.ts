import BookLocationRepository from './BookLocationRepository';
import { inject, injectable } from 'inversify';
import BookLocation, { IBookLocationModel } from './BookLocation';

@injectable()
export class BookLocationService {
    private bookLocationRepository: BookLocationRepository;

    constructor(@inject(BookLocationRepository) bookLocationRepository: BookLocationRepository) {
        this.bookLocationRepository = bookLocationRepository;
    }

    async getBookLocations(): Promise<IBookLocationModel[]> {
        return this.bookLocationRepository.getBookLocations();
    }
}

export default BookLocationService;
