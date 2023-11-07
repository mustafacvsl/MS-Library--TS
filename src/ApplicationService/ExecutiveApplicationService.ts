import ExecutiveService from '../Domain/Executive/executive.service';
import Author from '../Domain/User/auth.entity';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import Book, { IBookModel } from '../Domain/Book/Book';
import loanedEntity, { ILoanedModel } from '../Domain/Executive/Loaned/loaned.entity';
@injectable()
export class ExecutiveApplicationService {
    constructor(@inject(ExecutiveService) private executiveservice: ExecutiveService, @inject('Loaned') private loanedModel: ILoanedModel, @inject('Book') private bookModel: IBookModel) {}

    //? KULLANICILARI YÖNETME
    async listUsers() {
        const users = await Author.find({}, 'name email');
        return { users };
    }

    async updateAuthor(authorId: string, updateData: any) {
        const author = await Author.findByIdAndUpdate(authorId, updateData, { new: true });

        if (!author) {
            throw new Error('Author not found');
        }

        return { author };
    }

    async deleteAuthor(authorId: string) {
        const author = await Author.findByIdAndDelete(authorId);

        if (!author) {
            throw new Error('Author not found');
        }

        return { author, message: 'Deleted' };
    }

    //? KİTAP ÖDÜNÇ ALMA VERME İŞLEMİ
    async borrowBook(memberId: string, bookId: string) {
        const loaned = new this.loanedModel({ memberId, bookId });
        await loaned.save();

        const book = await this.bookModel.findById(bookId);
        if (book) {
            if (book.stock.count > 0) {
                book.stock.count -= 1;
                await book.save();
            } else {
                throw new Error('Book out of stock');
            }
        } else {
            throw new Error('Book not found');
        }

        return loaned;
    }

    async returnBook(loanedId: string) {
        const loaned = await this.loanedModel.findById(loanedId);
        if (loaned) {
            await loaned.remove();

            const book = await this.bookModel.findById(loaned.bookId);
            if (book) {
                book.stock.count += 1;
                await book.save();
            } else {
                throw new Error('Book not found');
            }
        } else {
            throw new Error('Loan not found');
        }
    }
}

export default ExecutiveApplicationService;
