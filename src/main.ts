import './shared/infra/monitoring/instrument';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './shared/infra/config/swagger.config';
import { setupGlobalPipes } from './shared/infra/config/globalPipes.config';
import { setupGlobalFilters } from './shared/infra/config/globalFilters.config';
import { setupPaginationConfig } from './shared/infra/config/pagination.config';
import * as cookieParser from 'cookie-parser';

setupPaginationConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  setupGlobalPipes(app);
  setupGlobalFilters(app);
  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((error) => console.error(error));
