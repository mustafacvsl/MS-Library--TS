import LoanedRepository from './LoanedRepository';
import { inject, injectable } from 'inversify';
import { ILoanedModel } from './LoanedEntity';
import { Result } from '../../infrastructure/Result';

@injectable()
export class LoanedService {
    private loanedRepository: LoanedRepository;

    constructor(@inject(LoanedRepository) loanedRepository: LoanedRepository) {
        this.loanedRepository = loanedRepository;
    }

    async createLoaned(loanedData: any): Promise<Result<ILoanedModel>> {
        const createdLoaned = await this.loanedRepository.createLoaned(loanedData);

        return {
            success: true,
            data: createdLoaned
        };
    }
}

export default LoanedService;
