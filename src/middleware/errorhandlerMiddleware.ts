import { Request, Response, NextFunction } from 'express';

export function errorHandler(): MethodDecorator {
    return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor => {
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, next: NextFunction): Promise<void> {
            try {
                await originalMethod.call(this, req, res, next);
            } catch (error) {
                console.error('Error:', error);
                res.status(500).send('Internal Server Error');
            }
        };

        return descriptor;
    };
}
