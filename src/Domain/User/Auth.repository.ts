import Author from './auth.entity';
import Book from '../Book/Book';

class AuthRepository {
    async findUserByEmail(email: string) {
        return Author.findOne({ email });
    }

    async findUserById(userId: string) {
        return Author.findById(userId);
    }
    async getAllBooks() {
        return Book.find({}, 'Books :');
    }
}

export default AuthRepository;
