import { Router } from 'express';
import { z } from 'zod';
import { validateBody } from '../../middleware/validate';
import { catchAsync } from '../../middleware/catchAsync';
import { OrderController } from './controller';

const CreateOrderSchema = z.object({
  customerEmail: z.string().email(),
  total: z.number().positive(),
});

// imported into index.ts
export const createOrderRouter = (orderController: OrderController) => {
  const router = Router();

  router.post(
    '/',
    validateBody(CreateOrderSchema),            // 1. Validation Middleware
    catchAsync(orderController.handleCreateOrder) // 2. Async Boundary Wrapper -> Controller
  );

  return router;
};
