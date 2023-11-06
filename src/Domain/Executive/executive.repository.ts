import Author from '../User/auth.entity';

class ExecutiveRepository {
    async findUserByEmail(email: string) {
        return Author.findOne({ email });
    }

    async findUserById(userId: string) {
        return Author.findById(userId);
    }

    async getAllUsers() {
        return Author.find({}, 'name email');
    }

    async updateUserById(userId: string, updatedUserInfo: any) {
        return Author.findByIdAndUpdate(userId, updatedUserInfo, { new: true });
    }

    async deleteUserById(userId: string) {
        return Author.findByIdAndDelete(userId);
    }
}

export default ExecutiveRepository;
