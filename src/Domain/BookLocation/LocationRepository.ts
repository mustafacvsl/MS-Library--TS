import Location, { IBookLocationModel } from './LocationEntity';
import { injectable } from 'inversify';

@injectable()
class LocationRepository {
    async createLocation(locationData: any): Promise<IBookLocationModel> {
        const newLocation: IBookLocationModel = new Location(locationData);
        return newLocation.save();
    }
}

export default LocationRepository;
