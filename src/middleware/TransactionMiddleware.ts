import TransactionHandler from './TransactionManager';

export function TransactionMiddleware(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
        const transactionHandler = new TransactionHandler();
        const result = await transactionHandler.runInTransaction(async (session) => {
            return await originalMethod.apply(this, args.concat(session));
        });

        return result;
    };

    return descriptor;
}
