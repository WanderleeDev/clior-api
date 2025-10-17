import { ApplicationErrorCode } from '../enum';
import { ApplicationException } from './application.exception';

export class ResourceNotDeletedException extends ApplicationException {
  static readonly DEFAULT_MESSAGE = 'Resource not deleted';

  constructor(message: string) {
    super(
      message || ResourceNotDeletedException.DEFAULT_MESSAGE,
      'ResourceNotDeletedException',
      ApplicationErrorCode.NotDeleted,
    );
  }
}
