import { Request, Response, NextFunction } from 'express';

export function ErrorHandlerMiddleware(error: Error, req: Request, res: Response, next: NextFunction): void {
    console.error('Error:', error);
    if (res && res.status) {
        res.status(500).send('Internal Server Error');
    } else {
        console.error('Response object does not have a status function.');
    }
}
