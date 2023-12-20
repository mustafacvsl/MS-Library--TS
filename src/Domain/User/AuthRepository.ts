import { injectable } from 'inversify';
import AuthEntity, { IAuthorModel } from './AuthEntity';

@injectable()
class AuthRepository {
    async findUserByEmail(email: string): Promise<IAuthorModel | null> {
        return AuthEntity.findOne({ email }).exec();
    }

    async registerUser(name: string, email: string, hashedPassword: string): Promise<IAuthorModel> {
        const user = new AuthEntity({ name, email, password: hashedPassword });
        return user.save();
    }

    async findUserById(userId: string): Promise<IAuthorModel | null> {
        return AuthEntity.findById(userId).exec();
    }

    async findUserByEmailAndPassword(email: string, password: string): Promise<IAuthorModel | null> {
        return AuthEntity.findOne({ email, password }).exec();
    }
}

export default AuthRepository;
