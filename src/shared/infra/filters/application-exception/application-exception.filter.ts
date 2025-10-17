import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import {
  ApplicationErrorCode,
  ApplicationException,
} from 'src/shared/application/exceptions/index.';
import { Response } from 'express';

@Catch(ApplicationException)
export class ApplicationExceptionFilter implements ExceptionFilter {
  readonly #errorCodeMap = new Map<ApplicationErrorCode, HttpStatus>([
    [ApplicationErrorCode.AlreadyExists, HttpStatus.CONFLICT],
    [ApplicationErrorCode.NotFound, HttpStatus.NOT_FOUND],
    [ApplicationErrorCode.NotCreated, HttpStatus.BAD_REQUEST],
    [ApplicationErrorCode.NotUpdated, HttpStatus.BAD_REQUEST],
    [ApplicationErrorCode.NotDeleted, HttpStatus.BAD_REQUEST],
  ]);

  constructor() {}

  catch(exception: ApplicationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const code = this.getErrorCode(exception.code);

    response.status(code).json({
      message: exception.message,
      name: exception.name,
      code,
    });
  }

  private getErrorCode(code: ApplicationErrorCode): HttpStatus {
    return this.#errorCodeMap.get(code) ?? HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
