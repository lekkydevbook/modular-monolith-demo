import { Request, Response } from 'express';
import { OrderService } from './service';

// imported into index.ts
export const createOrderController = (orderService: OrderService) => {
  const handleCreateOrder = async (req: Request, res: Response): Promise<void> => {
    // 1. Delegate business work straight to the injected service layer
    const result = await orderService.createOrder(req.body);
    
    // 2. Control the HTTP lifecycle response
    res.status(201).json(result);
  };

  return { handleCreateOrder };
};

// imported into router
export type OrderController = ReturnType<typeof createOrderController>;
