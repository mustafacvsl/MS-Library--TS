import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { handleResponse } from '../infrastructure/Response';
import { ExecutiveApplicationService } from '../ApplicationService/ExecutiveApplicationLayer';

@injectable()
export class ExecutiveController {
    constructor(@inject(ExecutiveApplicationService) private executiveapplicationservice: ExecutiveApplicationService) {}

    borrowBook = async (req: Request, res: Response, next: NextFunction) => {
        const { memberId, bookId, dueDate } = req.body;

        await this.executiveapplicationservice.borrowBook(memberId, bookId, dueDate);
        handleResponse(res, 201, null, 'Book borrowed successfully');
    };

    listUsers = async (req: Request, res: Response, next: NextFunction) => {
        const users = await this.executiveapplicationservice.listUsers();
        handleResponse(res, 200, { users }, 'Users listed successfully');
    };

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        const { userId, updateData } = req.body;
        const updatedUser = await this.executiveapplicationservice.updateUser(userId, updateData);
        console.log(updatedUser);
        handleResponse(res, 200, updatedUser, 'User updated successfully');
    };

    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;
        await this.executiveapplicationservice.deleteUser(userId);
        handleResponse(res, 200, null, 'User deleted successfully');
    };
}

export default ExecutiveController;
