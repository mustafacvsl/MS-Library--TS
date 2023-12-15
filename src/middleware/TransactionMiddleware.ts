import { Request, Response, NextFunction } from 'express';
import mongoose, { ClientSession } from 'mongoose';

declare global {
    namespace Express {
        interface Request {
            transactionSession: ClientSession;
        }
    }
}

export async function TransactionMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    const session = await mongoose.startSession();

    try {
        await session.withTransaction(async () => {
            req.transactionSession = session;
            next();
        });
    } catch (error) {
        console.error('Transaction failed:', error);
        res.status(500).json({ error: 'Transaction failed' });
    } finally {
        session.endSession();
    }
}
