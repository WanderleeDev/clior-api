import { ApplicationErrorCode } from '../enum';
import { ApplicationException } from './application.exception';

export class AlreadyExistsException extends ApplicationException {
  static readonly DEFAULT_MESSAGE = 'Resource already exists';

  constructor(message: string) {
    super(
      message || AlreadyExistsException.DEFAULT_MESSAGE,
      'AlreadyExistsException',
      ApplicationErrorCode.AlreadyExists,
    );
  }
}
