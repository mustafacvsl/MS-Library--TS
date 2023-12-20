import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { HandleResponse } from '../infrastructure/Response';
import BookLocationApplicationService from '../ApplicationService/LocationApplicationService';

@injectable()
export class BookLocationController {
    private bookLocationApplicationService: BookLocationApplicationService;

    constructor(@inject(BookLocationApplicationService) bookLocationApplicationService: BookLocationApplicationService) {
        this.bookLocationApplicationService = bookLocationApplicationService;
    }

    createOrUpdateBookLocation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { corridor, shelf, cupboard } = req.body;
        const bookLocation = await this.bookLocationApplicationService.createBookLocation({ corridor, shelf, cupboard });
        HandleResponse(res, 200, { bookLocation }, 'Book location created  successfully');
    };
}

export default BookLocationController;
