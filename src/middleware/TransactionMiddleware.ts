import { Request, Response, NextFunction } from 'express';
import TransactionHandler from './TransactionManager';

export async function TransactionMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    const transactionHandler = new TransactionHandler();
    await transactionHandler.runInTransaction(async (session) => {
        next();
    });
}
