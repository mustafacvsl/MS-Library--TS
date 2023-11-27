import authEntity from '../User/auth.entity';
import mongoose, { ClientSession } from 'mongoose';
import Book, { IBook } from '../Book/Book';
import loanedEntity, { ILoanedModel } from '../Loaned/loaned.entity';
import StockEntity, { IStock } from '../BookStock/Stock.entity';
const winston = require('winston');

class ExecutiveRepository {
    private client: mongoose.Mongoose;
    private databaseName: string;

    constructor() {
        this.client = mongoose;
        this.databaseName = 'library';
    }

    async findUserByEmail(email: string) {
        return authEntity.findOne({ email });
    }

    async findUserById(userId: string) {
        return authEntity.findById(userId);
    }

    async getAllUsers() {
        return authEntity.find({}, 'name email');
    }

    async updateUserById(userId: string, updatedUserInfo: any) {
        return authEntity.findByIdAndUpdate(userId, updatedUserInfo, { new: true });
    }

    async deleteUserById(userId: string) {
        return authEntity.findByIdAndDelete(userId);
    }

    //! KİTAP İŞLEMLERİ
    async borrowBook(memberId: string, bookId: string, session: ClientSession): Promise<ILoanedModel | null> {
        const options = { session };

        try {
            const book = await Book.findById(bookId, null, options); //Projection yerine null kullandım

            if (!book) {
                throw new Error('Book not found');
            }

            if (book.stock.count <= 0) {
                throw new Error('Book out of stock');
            }

            const stockEntry = new StockEntity({
                bookId,
                transactionType: 'entry',
                count: 1,
                timestamp: new Date()
            });

            await stockEntry.save(options);

            book.stock.count = Number(book.stock.count) - 1;
            await book.save(options);

            const loanedBook = new loanedEntity({
                memberId,
                bookId,
                borrowedDate: new Date(),
                returnedDate: null
            });

            const savedLoan = await loanedBook.save(options);

            return savedLoan;
        } catch (error) {
            throw error;
        }
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
