import LocationRepository from './LocationRepository';
import { inject, injectable } from 'inversify';
import { IBookLocationModel } from './LocationEntity';

@injectable()
export class LocationService {
    private locationRepository: LocationRepository;

    constructor(@inject(LocationRepository) locationRepository: LocationRepository) {
        this.locationRepository = locationRepository;
    }

    async createLocation(locationData: any): Promise<IBookLocationModel> {
        return this.locationRepository.createLocation(locationData);
    }
}

export default LocationService;
