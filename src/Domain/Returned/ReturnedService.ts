import ReturnedRepository from './ReturnedRepository';
import { inject, injectable } from 'inversify';
import { IReturnedModel } from './ReturnedEntity';
import { Result } from '../../infrastructure/Result';

@injectable()
export class ReturnedService {
    private returnedRepository: ReturnedRepository;

    constructor(@inject(ReturnedRepository) returnedRepository: ReturnedRepository) {
        this.returnedRepository = returnedRepository;
    }

    async createReturned(returnedData: any): Promise<Result<IReturnedModel>> {
        const createdReturned = await this.returnedRepository.createReturned(returnedData);

        return {
            success: true,
            data: createdReturned
        };
    }
}

export default ReturnedService;
