import { ApplicationErrorCode } from '../enum';

export abstract class ApplicationException extends Error {
  readonly code: ApplicationErrorCode;

  constructor(message: string, name: string, code: ApplicationErrorCode) {
    super(message);
    this.name = name;
    this.code = code;
  }
}
