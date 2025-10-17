import { DynamicModule } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

/**
 * Configure the request rate limiting module for the project.
 *
 * name: name of the request rate limit
 * ttl: time to live in milliseconds
 * limit: number of requests allowed within the time to live
 *
 * @return {DynamicModule} The configured request rate limiting module.
 */
export function setupThrottlerConfig(): DynamicModule {
  return ThrottlerModule.forRoot([
    {
      name: 'short',
      ttl: 1000,
      limit: 3,
    },
    {
      name: 'medium',
      ttl: 10000,
      limit: 20,
    },
    {
      name: 'long',
      ttl: 60000,
      limit: 100,
    },
    {
      name: 'default',
      ttl: 60000,
      limit: 1,
    },
  ]);
}
