import { INestApplication } from '@nestjs/common';
import { GlobalExceptionFilter } from '../filters/global-exception/global-exception.filter';
import { DomainExceptionFilter } from '../filters/domain-exception/domain-exception.filter';

export function setupGlobalFilters(app: INestApplication) {
  app.useGlobalFilters(
    new DomainExceptionFilter(),
    new GlobalExceptionFilter(),
  );
}
