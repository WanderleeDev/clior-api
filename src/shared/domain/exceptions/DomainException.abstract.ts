import { AgreementError } from '../vo/abstracts/BaseAbstract.vo';

export interface DomainExceptionProps {
  name: string;
  origin: string;
  message: string;
  errors?: AgreementError[];
}

export type ExceptionProps = Omit<DomainExceptionProps, 'name'>;

export abstract class DomainException extends Error {
  readonly name: string;
  readonly origin: string;
  readonly errors?: AgreementError[];

  constructor({ name, origin, message, errors }: DomainExceptionProps) {
    super(message);
    this.name = name;
    this.origin = origin;
    this.errors = errors;
  }
}
