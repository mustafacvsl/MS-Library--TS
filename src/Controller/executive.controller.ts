import { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { ExecutiveApplicationService } from '../ApplicationService/ExecutiveApplicationService';
import { handleResponse } from '../infrastructure/response';

@injectable()
export class ExecutiveController {
    private executiveApplicationService: ExecutiveApplicationService;

    constructor(@inject(ExecutiveApplicationService) executiveApplicationService: ExecutiveApplicationService) {
        this.executiveApplicationService = executiveApplicationService;
    }

    borrowBook = async (req: Request, res: Response, next: NextFunction) => {
        const { memberId, bookId } = req.body;

        try {
            if (!memberId || !bookId) {
                handleResponse(res, 400, null, 'MemberId and BookId are required.');
                return;
            }

            await this.executiveApplicationService.borrowBook(memberId, bookId, res);

            handleResponse(res, 200, null, 'Book borrowed successfully');
        } catch (error) {
            console.error('Error:', error);
            handleResponse(res, 500, null, 'Internal Server Error');
        }
    };
}

export default ExecutiveController;
