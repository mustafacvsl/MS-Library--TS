import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { HandleResponse } from '../infrastructure/Response';
import { StockApplicationService } from '../ApplicationService/StockApplicationService';

@injectable()
export class StockController {
    private stockApplicationService: StockApplicationService;

    constructor(@inject(StockApplicationService) stockApplicationService: StockApplicationService) {
        this.stockApplicationService = stockApplicationService;
    }

    createStock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { count } = req.body;
        const stock = await this.stockApplicationService.createStock(count);
        HandleResponse(res, 200, { stock }, 'Stock created or updated successfully');
    };
}

export default StockController;
