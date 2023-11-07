import ExecutiveService from '../Domain/Executive/executive.service';
import Author from '../Domain/User/auth.entity';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import Book, { IBookModel } from '../Domain/Book/Book';
import loanedEntity, { ILoanedModel } from '../Domain/Executive/Loaned/loaned.entity';
import { Model } from 'mongoose';
@injectable()
export class ExecutiveApplicationService {
    constructor(@inject(ExecutiveService) private executiveservice: ExecutiveService, @inject('Loaned') private LoanedModel: Model<ILoanedModel>, @inject('Book') private bookModel: IBookModel) {}

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
}

export default ExecutiveApplicationService;
