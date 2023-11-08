import authEntity from '../User/auth.entity';
import mongoose from 'mongoose';
import { MongoClient, ObjectId } from 'mongodb';
import { ILoanedModel } from '../Loaned/loaned.entity';

class ExecutiveRepository {
    private client: MongoClient;
    private databaseName: string;

    constructor() {
        this.client = new MongoClient(process.env.MONGO_URL || '');
        this.databaseName = 'library';
    }
    async findUserByEmail(email: string) {
        return authEntity.findOne({ email });
    }

    async findUserById(userId: string) {
        return authEntity.findById(userId);
    }

    async getAllUsers() {
        return authEntity.find({}, 'name email');
    }

    async updateUserById(userId: string, updatedUserInfo: any) {
        return authEntity.findByIdAndUpdate(userId, updatedUserInfo, { new: true });
    }

    async deleteUserById(userId: string) {
        return authEntity.findByIdAndDelete(userId);
    }

    //! KİTAP İŞLEMLERİ
}

export default ExecutiveRepository;
