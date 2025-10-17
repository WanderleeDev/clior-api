import { ApplicationErrorCode } from '../enum';
import { ApplicationException } from './application.exception';

export class ResourceNotUpdatedException extends ApplicationException {
  static readonly DEFAULT_MESSAGE = 'Resource not updated';

  constructor(message: string) {
    super(
      message || ResourceNotUpdatedException.DEFAULT_MESSAGE,
      'ResourceNotUpdatedException',
      ApplicationErrorCode.NotUpdated,
    );
  }
}
