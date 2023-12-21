import Returned, { IReturnedModel } from './ReturnedEntity';
import { injectable } from 'inversify';

@injectable()
class ReturnedRepository {
    async createReturned(returnedData: any): Promise<IReturnedModel> {
        const newReturned: IReturnedModel = new Returned(returnedData);
        return newReturned.save();
    }
}

export default ReturnedRepository;
