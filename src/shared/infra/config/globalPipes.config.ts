import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

export function setupGlobalPipes(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
}
