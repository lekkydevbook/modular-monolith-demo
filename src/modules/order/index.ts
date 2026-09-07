import { DatabaseClient } from '../../db/client';
import { NotificationModule } from '../notification';
import { createOrderService } from './service';
import { createOrderController } from './controller';
import { createOrderRouter } from './router';

// imported into app.ts
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

// never imported. never used
export type OrderModule = ReturnType<typeof createOrderModule>;
