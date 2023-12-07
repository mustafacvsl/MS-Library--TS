import mongoose, { ClientSession, Types } from 'mongoose';
import Book, { IBook } from '../Book/Book';
import loanedEntity, { ILoanedModel } from '../Loaned/loaned.entity';
import StockEntity, { IStock } from '../BookStock/Stock.entity';
import memberEntity from '../Member/member.entity';
import { addDays } from 'date-fns';
import AuthRepository from '../User/Auth.repository';
import { IBookModel } from '../Book/Book';

class ExecutiveRepository {
    private client: mongoose.Mongoose;
    private databaseName: string;
    private authrepository: AuthRepository;

    constructor() {
        this.client = mongoose;
        this.databaseName = 'library';
        this.authrepository = new AuthRepository();
    }

    async borrowBook(memberId: string, bookId: string, session: ClientSession): Promise<IBookModel | null> {
        const member = await memberEntity.findById(memberId).session(session);

        const book = await Book.findById(bookId).session(session);

        if (!member || !book) {
            throw new Error('Member or book not found');
        }

        await session.commitTransaction();

        return book as IBookModel;
    }

    async returnBook(loanId: string, session: ClientSession): Promise<ILoanedModel | null> {
        const options = { session };

        try {
            const loanedBook = await loanedEntity.findById(loanId, options);

            if (!loanedBook) {
                throw new Error('Loan not found');
            }

            if (loanedBook.returnedDate) {
                throw new Error('Book already returned');
            }

            loanedBook.returnedDate = new Date();

            const stockEntry = new StockEntity({
                bookId: loanedBook.bookId,
                transactionType: 'entry',
                count: 1,
                timestamp: new Date()
            });

            await stockEntry.save(options);

            const updatedLoan = await loanedBook.save(options);

            return updatedLoan;
        } catch (error) {
            throw error;
        }
    }
}

export default ExecutiveRepository;
