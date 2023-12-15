import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { HandleResponse } from '../infrastructure/Response';
import { ExecutiveApplicationService } from '../ApplicationService/ExecutiveApplicationService';

@injectable()
export class ExecutiveController {
    constructor(@inject(ExecutiveApplicationService) private executiveapplicationservice: ExecutiveApplicationService) {}

    borrowBook = async (req: Request, res: Response, next: NextFunction) => {
        const { memberId, bookId, dueDate } = req.body;

        await this.executiveapplicationservice.borrowBook(memberId, bookId, dueDate);
        HandleResponse(res, 201, null, 'Book borrowed successfully');
    };

    listUsers = async (req: Request, res: Response, next: NextFunction) => {
        const users = await this.executiveapplicationservice.listUsers();
        HandleResponse(res, 200, { users }, 'Users listed successfully');
    };

    returnBook = async (req: Request, res: Response, next: NextFunction) => {
        const { loanedId } = req.body;

        await this.executiveapplicationservice.returnBook(loanedId);
        HandleResponse(res, 200, null, 'Book returned successfully');
    };

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        const { userId, updateData } = req.body;
        const updatedUser = await this.executiveapplicationservice.updateUser(userId, updateData);
        console.log(updatedUser);
        HandleResponse(res, 200, updatedUser, 'User updated successfully');
    };

    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;
        await this.executiveapplicationservice.deleteUser(userId);
        HandleResponse(res, 200, null, 'User deleted successfully');
    };
}

export default ExecutiveController;
