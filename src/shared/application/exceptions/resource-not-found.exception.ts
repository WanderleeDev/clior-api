import { ApplicationErrorCode } from '../enum';
import { ApplicationException } from './application.exception';

export class ResourceNotFoundException extends ApplicationException {
  static readonly DEFAULT_MESSAGE = 'Resource not found';

  constructor(message: string) {
    super(
      message || ResourceNotFoundException.DEFAULT_MESSAGE,
      'ResourceNotFoundException',
      ApplicationErrorCode.NotFound,
    );
  }
}
