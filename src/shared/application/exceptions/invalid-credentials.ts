import { ApplicationErrorCode } from '../enum';
import { ApplicationException } from './application.exception';

export class InvalidCredentialsException extends ApplicationException {
  static readonly DEFAULT_MESSAGE = 'Invalid credentials';

  constructor(message?: string) {
    super(
      message || InvalidCredentialsException.DEFAULT_MESSAGE,
      'InvalidCredentialsException',
      ApplicationErrorCode.Unauthorized,
    );
  }
}
