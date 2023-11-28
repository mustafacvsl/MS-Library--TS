import { injectable } from 'inversify';
import authEntity, { IAuthorModel } from './auth.entity';
import Book, { IBookModel } from '../Book/Book';

@injectable()
class AuthRepository {
    async findUserByEmail(email: string): Promise<IAuthorModel | null> {
        return authEntity.findOne({ email }).exec();
    }

    async registerUser(name: string, email: string, hashedPassword: string): Promise<IAuthorModel> {
        const user = new authEntity({ name, email, password: hashedPassword });
        return user.save();
    }

    async getAllBooks(): Promise<IBookModel[]> {
        return Book.find({}).exec();
    }

    async findUserById(userId: string): Promise<IAuthorModel | null> {
        return authEntity.findById(userId).exec();
    }

    async loginUser(email: string): Promise<IAuthorModel | null> {
        return authEntity.findOne({ email }).exec();
    }
}

export default AuthRepository;
