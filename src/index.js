import { setupServer } from './server';
import { initMongoConnection } from './db/initMongoDB';

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();
