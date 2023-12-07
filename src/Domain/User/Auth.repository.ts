import { injectable } from 'inversify';
import authEntity, { IAuthorModel } from './auth.entity';
import { Types } from 'mongoose';

@injectable()
class AuthRepository {
    async findUserByEmail(email: string): Promise<IAuthorModel | null> {
        return authEntity.findOne({ email }).exec();
    }

    async registerUser(name: string, email: string, hashedPassword: string): Promise<IAuthorModel> {
        const user = new authEntity({ name, email, password: hashedPassword });
        return user.save();
    }

    async getAllBooks(): Promise<IAuthorModel[]> {
        return authEntity.find({}).exec();
    }

    async findUserById(userId: string): Promise<IAuthorModel | null> {
        return authEntity.findById(userId).exec();
    }

    async findUserByEmailAndPassword(email: string, password: string): Promise<IAuthorModel | null> {
        return authEntity.findOne({ email, password }).exec();
    }
}

export default AuthRepository;
