import { NextFunction, Request, Response } from 'express';
export const handleResponse = (res: Response, statusCode: number, data: any, message: string = '') => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message, data }));
};
