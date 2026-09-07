import express from 'express';
import { db } from './db/client';
import { createNotificationModule } from './modules/notification';
import { createOrderModule } from './modules/order';
import { globalErrorHandler } from './middleware/errorHandler';

async function bootstrap() {
  const app = express();
  app.use(express.json());

  // Instantiate Modules
  const notificationModule = createNotificationModule(db);
  const orderModule = createOrderModule(db, notificationModule);

  // Mount clean, encapsulated module endpoints
  app.use('/api/orders', orderModule.router);

  app.use(globalErrorHandler);

  app.listen(3000, () => console.log('[App] Clean Architectural Layering Active'));
}

bootstrap();
