import { Request, Response, NextFunction } from 'express';
import { Result } from '../infrastructure/Result';

export function ErrorHandlerMiddleware(error: Error, req: Request, res: Response, next: NextFunction): void {
    console.error('Error:', error);

    if (res && res.status) {
        const result: Result<null> = {
            success: false,
            error: {
                message: error.message || 'Internal Server Error'
            }
        };

        res.status(500).json(result);
    } else {
        console.error('Response object does not have a status function.');
        next(error);
    }
}
