import { inject, injectable } from 'inversify';
import ExecutiveRepository from './executive.repository';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import Author, { IAuthorModel } from '../User/auth.entity';
import 'reflect-metadata';

@injectable()
class ExecutiveService {
    constructor(@inject(ExecutiveRepository) private executiverepository: ExecutiveRepository) {}

    async listUsers(): Promise<IAuthorModel[]> {
        const users = await this.executiverepository.getAllUsers();
        return users;
    }

    async updateUser(authorId: string, updatedAuthorInfo: any): Promise<IAuthorModel> {
        const author = await this.executiverepository.findUserById(authorId);
        if (!author) {
            throw new Error('User not found');
        }

        author.set(updatedAuthorInfo);

        try {
            const updatedAuthor = await author.save();
            return updatedAuthor;
        } catch (error) {
            throw error;
        }
    }

    async deleteAuthor(authorId: string): Promise<IAuthorModel | null> {
        const author = await this.executiverepository.findUserById(authorId);
        if (!author) {
            return null;
        }

        try {
            const deletedAuthor = await this.executiverepository.deleteUserById(authorId);
            return deletedAuthor;
        } catch (error) {
            throw error;
        }
    }
}

export default ExecutiveService;
