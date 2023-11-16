import { Request, Response, NextFunction } from 'express';

export function errorHandlerMiddleware(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await originalMethod.call(this, req, res, next);
        } catch (error) {
            console.error('Error:', error);
            if (res && res.status) {
                res.status(500).send('Internal Server Error');
            } else {
                console.error('Response object does not have a status function.');
            }
        }
    };

    return descriptor;
}
