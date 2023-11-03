import Author from './Author';

class AuthRepository {
    async findUserByEmail(email: string) {
        return Author.findOne({ email });
    }

    async findUserById(userId: string) {
        return Author.findById(userId);
    }
}

export default AuthRepository;
