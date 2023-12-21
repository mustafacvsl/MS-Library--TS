import Loaned, { ILoanedModel } from './LoanedEntity';
import { injectable } from 'inversify';

@injectable()
class LoanedRepository {
    async createLoaned(loanedData: any): Promise<ILoanedModel> {
        const newLoaned: ILoanedModel = new Loaned(loanedData);
        return newLoaned.save();
    }
}

export default LoanedRepository;
