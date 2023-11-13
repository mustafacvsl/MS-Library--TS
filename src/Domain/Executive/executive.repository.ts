import authEntity from '../User/auth.entity';
import mongoose from 'mongoose';
import { MongoClient, ObjectId } from 'mongodb';
import Book, { IBook } from '../Book/Book';
import loanedEntity, { ILoanedModel } from '../Loaned/loaned.entity';
import StockEntity, { IStock } from '../BookStock/Stock.entity';

class ExecutiveRepository {
    private client: MongoClient;
    private databaseName: string;
    constructor() {
        this.client = new MongoClient(process.env.MONGO_URL || '');
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

    async borrowBook(memberId: string, bookId: string): Promise<ILoanedModel | null> {
        const book = await Book.findById(bookId);

        if (!book) {
            throw new Error('Book not found');
        }

        if (book.stock.count <= 0) {
            throw new Error('Book out of stock');
        }

        book.stock.count = Number(book.stock.count) - 1;
        await book.save();

        const loanedBook = new loanedEntity({
            memberId,
            bookId,
            borrowedDate: new Date(),
            returnedDate: null
        });

        const savedLoan = await loanedBook.save();

        return savedLoan;
    }

    async returnBook(loanId: string): Promise<ILoanedModel | null> {
        const loanedBook = await loanedEntity.findById(loanId);

        if (!loanedBook) {
            throw new Error('Loan not found');
        }

        if (loanedBook.returnedDate) {
            throw new Error('Book already returned');
        }

        loanedBook.returnedDate = new Date();

        const updatedLoan = await loanedBook.save();

        return updatedLoan;
    }
}

export default ExecutiveRepository;
