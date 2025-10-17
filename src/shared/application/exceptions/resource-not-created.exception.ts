import { ApplicationErrorCode } from '../enum';
import { ApplicationException } from './application.exception';

export class ResourceNotCreatedException extends ApplicationException {
  static readonly DEFAULT_MESSAGE = 'Resource not created';

  constructor(message: string) {
    super(
      message || ResourceNotCreatedException.DEFAULT_MESSAGE,
      'ResourceNotCreatedException',
      ApplicationErrorCode.NotCreated,
    );
  }
}
