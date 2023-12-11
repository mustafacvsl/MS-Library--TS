LoanedEntity.ts

import mongoose, { Document, Schema } from 'mongoose';
import mongoose, { Document, Schema } from 'mongoose';
import memberEntity, { IMember } from '../Member/member.entity';
import Book, { IBook } from '../Book/Book';
import { required } from 'joi';

export interface ILoaned {
    memberId: IMember;
    bookId: IBook;
    borrowedDate: string;
    returnedDate?: string;
}

export interface ILoanedModel extends ILoaned, Document {}

const LoanedSchema: Schema = new Schema(
    {
        memberId: { type: Schema.Types.ObjectId, required: true, ref: 'Member' },
        bookId: { type: Schema.Types.ObjectId, required: true, ref: 'Book' },
        borrowedDate: { type: String, required: true },
        returnedDate: { type: String }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<ILoanedModel>('Loaned', LoanedSchema);




_____________________________________________________________________________________________

memberentity.ts


import mongoose, { Document, Schema } from 'mongoose';
import authEntity, { IAuthor } from '../User/auth.entity';

export interface IMember {
    name: IAuthor;
    email: IAuthor;
}

export interface IMemberModel extends IMember, Document {}

const MemberSchema: Schema = new Schema(
    {
        name: { type: String, required: true, ref: 'Author' },
        email: { type: String, required: true, unique: true, ref: 'Author' }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IMemberModel>('Member', MemberSchema);

_____________________________________________________________________________________________

executivecontroller.ts


import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import Joi from 'joi';
import { handleResponse } from '../infrastructure/response';
import { errorHandlerMiddleware } from '../middleware/errorhandlerMiddleware';
import { ExecutiveApplicationService } from '../ApplicationService/ExecutiveApplicationService';

@injectable()
export class ExecutiveController {
    constructor(@inject('ExecutiveApplicationService') private executiveapplicationservice: ExecutiveApplicationService) {}

    borrowBook = async (req: Request, res: Response, next: NextFunction) => {
        const { memberId, bookId } = req.body;

        if (!memberId || !bookId) {
            handleResponse(res, 400, null, 'MemberId, bookId, and borrowedDate are required.');
            return;
        }

        await this.executiveapplicationservice.borrowBook(memberId, bookId, res);
    };

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;
        const { name, email, password } = req.body;

        if (!userId || !name || !email || !password) {
            handleResponse(res, 400, null, 'UserId, name, email, and password are required.');
            return;
        }

        await this.executiveapplicationservice.updateUser(userId, { name, email, password }, res);
    };

    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;

        if (!userId) {
            handleResponse(res, 400, null, 'UserId is required.');
            return;
        }

        await this.executiveapplicationservice.deleteUser(userId, res);
    };

    getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        await this.executiveapplicationservice.getAllUsers(res);
    };

    getUserById = async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;

        if (!userId) {
            handleResponse(res, 400, null, 'UserId is required.');
            return;
        }

        await this.executiveapplicationservice.getUserById(userId, res);
    };
}


_____________________________________________________________________________________________
executiveApplicationService.ts

import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Response } from 'express';
import { errorHandlerMiddleware } from '../middleware/errorhandlerMiddleware';
import Joi from 'joi';
import TransactionHandler from '../infrastructure/Transaction/TransactionManager';
import ExecutiveService from '../Domain/Executive/executive.service';

@injectable()
export class ExecutiveApplicationService {
    constructor(@inject(ExecutiveService) private executiveservice: ExecutiveService, @inject(TransactionHandler) private transactionHandler: TransactionHandler) {}

    @errorHandlerMiddleware
    async borrowBook(memberId: string, bookId: string, res: Response): Promise<void> {
        return this.transactionHandler.runInTransaction(async (session) => {
            await this.executiveservice.borrowBook(memberId, bookId, res, session);
        });
    }

    @errorHandlerMiddleware
    async updateUser(userId: string, updates: Partial<{ name: string; email: string; password: string }>, res: Response): Promise<void> {
        return this.transactionHandler.runInTransaction(async (session) => {
            await this.executiveservice.updateUser(userId, updates, res);
        });
    }

    @errorHandlerMiddleware
    async deleteUser(userId: string, res: Response): Promise<void> {
        return this.transactionHandler.runInTransaction(async (session) => {
            await this.executiveservice.deleteUser(userId, res);
        });
    }

    @errorHandlerMiddleware
    async getAllUsers(res: Response): Promise<void> {
        await this.executiveservice.getAllUsers(res);
    }

    @errorHandlerMiddleware
    async getUserById(userId: string, res: Response): Promise<void> {
        await this.executiveservice.getUserById(userId, res);
    }
}


_____________________________________________________________________________________________

executiveservice.ts 


   
import { inject, injectable } from 'inversify';
import { Response } from 'express'; // Import Response from 'express'
import { errorHandlerMiddleware } from '../../middleware/errorhandlerMiddleware';
import { handleResponse } from '../../infrastructure/response';
import { addDays } from 'date-fns';
import { ClientSession } from 'mongoose';
import { ExecutiveRepository } from './executive.repository';
import authEntity, { IAuthorModel } from '../User/auth.entity';
import Book from '../Book/Book';
import memberEntity from '../Member/member.entity';
import loanedEntity from '../Loaned/loaned.entity';
import parse from 'date-fns';

@injectable()
class ExecutiveService {
    constructor(@inject(ExecutiveRepository) private executiverepository: ExecutiveRepository) {}

    async borrowBook(memberId: string, bookId: string, res: Response, session: ClientSession): Promise<any> {
        const borrowedBook = await this.executiverepository.borrowBook(memberId, bookId, session);
        const member = await memberEntity.findById(memberId);
        const book = await Book.findById(bookId);

        if (!member || !book) {
            handleResponse(res, 404, null, 'Member or book not found');
            return;
        }

        handleResponse(res, 201, { loaned: borrowedBook, member, book }, 'Book borrowed successfully');
    }

    @errorHandlerMiddleware
    async updateUser(userId: string, updates: Partial<IAuthorModel>, res: Response): Promise<any> {
        const user = await this.executiverepository.updateUser(userId, updates);

        if (!user) {
            handleResponse(res, 404, null, 'User not found');
            return;
        }

        handleResponse(res, 200, { user }, 'User updated successfully');
    }

    @errorHandlerMiddleware
    async deleteUser(userId: string, res: Response): Promise<void> {
        await this.executiverepository.deleteUser(userId);
        handleResponse(res, 200, null, 'User deleted successfully');
    }

    @errorHandlerMiddleware
    async getAllUsers(res: Response): Promise<void> {
        const users = await this.executiverepository.getAllUsers();
        handleResponse(res, 200, { users }, 'Users listed successfully');
    }

    @errorHandlerMiddleware
    async getUserById(userId: string, res: Response): Promise<void> {
        const user = await this.executiverepository.getUserById(userId);

        if (!user) {
            handleResponse(res, 404, null, 'User not found');
            return;
        }

        handleResponse(res, 200, { user }, 'User retrieved successfully');
    }
}

export default ExecutiveService;



_____________________________________________________________________________________________

executiverepository.ts 

import mongoose, { ClientSession, Types } from 'mongoose';
import loanedEntity from '../Loaned/loaned.entity';
import AuthRepository from '../User/Auth.repository';
import Book from '../Book/Book';
import authEntity, { IAuthorModel, IAuthor } from '../User/auth.entity';
import { handleResponse } from '../../infrastructure/response';
export class ExecutiveRepository {
    private client: mongoose.Mongoose;
    private databaseName: string;
    private authrepository: AuthRepository;

    constructor() {
        this.client = mongoose;
        this.databaseName = 'library';
        this.authrepository = new AuthRepository();
    }

    async borrowBook(memberId: string, bookId: string, session: ClientSession): Promise<any> {
        const loaned = new loanedEntity({
            memberId,
            bookId
        });

        await loaned.save({ session });

        await Book.findByIdAndUpdate(bookId, { status: 'Borrowed' }, { session });
        console.log(loaned);

        return loaned.save();
    }

    async updateUser(userId: string, updates: Partial<IAuthorModel>): Promise<IAuthorModel | null> {
        return authEntity.findByIdAndUpdate(userId, updates, { new: true }).exec();
    }

    async deleteUser(userId: string): Promise<void> {
        await authEntity.findByIdAndDelete(userId).exec();
    }

    async getAllUsers(): Promise<IAuthorModel[]> {
        return authEntity.find({}).exec();
    }

    async getUserById(userId: string): Promise<IAuthorModel | null> {
        return authEntity.findById(userId).exec();
    }
}



_____________________________________________________________________________________________

