import Author from './auth.entity';

class AuthRepository {
    async findUserByEmail(email: string) {
        return Author.findOne({ email });
    }

    async findUserById(userId: string) {
        return Author.findById(userId);
    }
}

export default AuthRepository;
