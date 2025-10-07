import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { DomainException } from 'src/shared/domain/exceptions/DomainException.abstract';
import { HttpStatus } from '@nestjs/common';

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      name: exception.name,
      message: exception.message,
      origin: exception.origin,
      errors: exception.errors,
    });
  }
}
