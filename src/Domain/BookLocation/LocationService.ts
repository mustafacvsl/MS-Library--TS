import LocationRepository from './LocationRepository';
import { inject, injectable } from 'inversify';
import { IBookLocationModel } from './LocationEntity';
import mongoose from 'mongoose';

@injectable()
export class LocationService {
    private locationRepository: LocationRepository;

    constructor(@inject(LocationRepository) locationRepository: LocationRepository) {
        this.locationRepository = locationRepository;
    }

    async createLocation(bookId: string, locationData: any): Promise<IBookLocationModel> {
        locationData.bookId = new mongoose.Types.ObjectId(bookId);
        return this.locationRepository.createLocation(locationData);
    }
}

export default LocationService;
