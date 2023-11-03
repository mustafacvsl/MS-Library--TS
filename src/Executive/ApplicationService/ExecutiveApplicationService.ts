import ExecutiveService from '../domain/Admin/executive.service';
import Author from '../../Auth-Service/domain/User/Author';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import { injectable, inject } from 'inversify';
import 'reflect-metadata';

@injectable()
export class ExecutiveApplicationService {
    constructor(@inject(ExecutiveService) private executiveservice: ExecutiveService) {}

    async listUsers() {
        const users = await Author.find({}, 'name email');
        return { users };
    }

    async updateAuthor(authorId: string, updateData: any) {
        const author = await Author.findByIdAndUpdate(authorId, updateData, { new: true });

        if (!author) {
            throw new Error('Author not found');
        }

        return { author };
    }

    async deleteAuthor(authorId: string) {
        const author = await Author.findByIdAndDelete(authorId);

        if (!author) {
            throw new Error('Author not found');
        }

        return { author, message: 'Deleted' };
    }
}

export default ExecutiveApplicationService;
