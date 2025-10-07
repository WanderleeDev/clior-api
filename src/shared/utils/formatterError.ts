import { DomainException } from 'src/shared/domain/exceptions/DomainException.abstract';
import { BadRequestException, HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

export interface ErrorCommonResponse {
  error: string;
  details: {
    message: string;
    origin?: string;
    errors?: string[];
  };
  statusCode: number;
}

export function formatterException(exec: unknown): ErrorCommonResponse {
  if (exec instanceof DomainException) {
    return {
      error: exec.name,
      details: {
        message: exec.message,
        origin: exec.origin,
        // errors: exec.errors,
      },
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    };
  }

  if (exec instanceof BadRequestException) {
    return {
      error: exec.name,
      details: {
        message: exec.message,
        errors: formatErrors(exec.getResponse()),
      },
      statusCode: exec.getStatus(),
    };
  }

  if (exec instanceof HttpException || exec instanceof Error) {
    const statusCode =
      exec instanceof HttpException
        ? exec.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    return {
      error: exec.name,
      details: { message: exec.message },
      statusCode,
    };
  }

  return {
    error: 'Server internal error',
    details: { message: 'Unknown error' },
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  };
}

export function formatErrors(errors: string | object): string[] {
  if (typeof errors === 'string') {
    return [errors];
  }

  return Object.values(errors).map((error) => String(error).toString());
}
