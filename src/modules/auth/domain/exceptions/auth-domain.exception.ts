import {
  DomainException,
  ExceptionProps,
} from 'src/shared/domain/exceptions/DomainException.abstract';

export class AuthDomainException extends DomainException {
  static readonly ORIGIN_DEFAULT = 'AUTH_DOMAIN';
  static readonly NAME_EXCEPTION = 'AuthDomainException';

  constructor({
    message = 'Auth domain exception',
    errors,
    origin = AuthDomainException.ORIGIN_DEFAULT,
  }: ExceptionProps) {
    super({
      name: AuthDomainException.NAME_EXCEPTION,
      message,
      errors,
      origin,
    });
  }
}
