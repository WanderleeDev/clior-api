import {
  DomainException,
  ExceptionProps,
} from 'src/shared/domain/exceptions/DomainException.abstract';

export class UserDomainException extends DomainException {
  static readonly ORIGIN_DEFAULT = 'USER_DOMAIN';
  static readonly NAME_EXCEPTION = 'UserDomainException';

  constructor({
    message = 'User domain exception',
    errors,
    origin = UserDomainException.ORIGIN_DEFAULT,
  }: ExceptionProps) {
    super({
      name: UserDomainException.NAME_EXCEPTION,
      message,
      errors,
      origin,
    });
  }
}
