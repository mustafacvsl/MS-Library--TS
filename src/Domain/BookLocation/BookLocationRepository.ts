import BookLocation, { IBookLocationModel } from './BookLocation';
import { injectable } from 'inversify';

@injectable()
class BookLocationRepository {
    async getBookLocations(): Promise<IBookLocationModel[]> {
        const bookLocations: IBookLocationModel[] = await BookLocation.find();
        return bookLocations;
    }
}

export default BookLocationRepository;
