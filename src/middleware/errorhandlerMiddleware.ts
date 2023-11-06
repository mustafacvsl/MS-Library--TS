import { NextFunction, Request, Response } from 'express';

export const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    res.status(400).json({ error: err.message });
    res.status(401).json({ error: err.message });
    res.status(500).json({ error: err.message });
};
export default errorHandlerMiddleware;
