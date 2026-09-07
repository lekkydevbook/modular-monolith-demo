import { DatabaseClient } from '../../db/client';
import { NotificationModule } from '../notification';
import { createOrderService } from './order.service';
import { createOrderController } from './order.controller';
import { createOrderRouter } from './order.router';

export const createOrderModule = (db: DatabaseClient, notificationModule: NotificationModule) => {
  // 1. Construct the internal onion layers
  const service = createOrderService(db, notificationModule);
  const controller = createOrderController(service);
  const router = createOrderRouter(controller);

  // 2. Expose the router to the global app, and the service to other internal structures
  return {
    router,
    service 
  };
};

export type OrderModule = ReturnType<typeof createOrderModule>;
