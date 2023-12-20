import BookLocation, { IBookLocationModel } from './BookLocation';
import { injectable } from 'inversify';

@injectable()
class BookLocationRepository {
    async createBookLocation(locationDetails: { corridor: string; shelf: string; cupboard: string }): Promise<IBookLocationModel> {
        const newBookLocation: IBookLocationModel = new BookLocation(locationDetails);
        return newBookLocation.save();
    }
}

export default BookLocationRepository;
