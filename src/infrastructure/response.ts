import { Response } from 'express';

export const HandleResponse = (res: Response, statusCode: number, data: any, message: string = '') => {
    res.status(statusCode).json({
        status: statusCode,
        data: data,
        message: message
    });
};
