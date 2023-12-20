import BookLocationRepository from './BookLocationRepository';
import { inject, injectable } from 'inversify';
import BookLocation, { IBookLocationModel } from './BookLocation';

@injectable()
export class BookLocationService {
    private bookLocationRepository: BookLocationRepository;

    constructor(@inject(BookLocationRepository) bookLocationRepository: BookLocationRepository) {
        this.bookLocationRepository = bookLocationRepository;
    }

    async createBookLocation(locationDetails: { corridor: string; shelf: string; cupboard: string }): Promise<IBookLocationModel | null> {
        return this.bookLocationRepository.createBookLocation(locationDetails);
    }
}

export default BookLocationService;
