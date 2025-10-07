import { BaseAgreementRoot } from './BaseAbstract.vo';

export interface TextVoProps {
  value: string;
  minLength?: number;
  maxLength?: number;
}

export abstract class TextVO extends BaseAgreementRoot {
  static readonly MAX_LENGTH_DEFAULT = 100;
  static readonly MIN_LENGTH_DEFAULT = 1;

  readonly #value: string;
  readonly #minLengthValue: number;
  readonly #maxLengthValue: number;

  constructor({
    value,
    minLength = TextVO.MIN_LENGTH_DEFAULT,
    maxLength = TextVO.MAX_LENGTH_DEFAULT,
  }: TextVoProps) {
    super();
    this.validateBase(value.trim(), minLength, maxLength);

    this.#minLengthValue = minLength;
    this.#maxLengthValue = maxLength;
    this.#value = value.trim();
  }

  get value(): string {
    return this.#value;
  }

  get minLengthConstraint(): number {
    return this.#minLengthValue;
  }

  get maxLengthConstraint(): number {
    return this.#maxLengthValue;
  }

  private validateBase(
    value: string,
    minLength: number,
    maxLength: number,
  ): void {
    if (!Number.isInteger(minLength) || !Number.isInteger(maxLength)) {
      this.errors.push({
        field: this.NAME,
        message: 'Min and max length must be integers',
      });
    }

    if (minLength < TextVO.MIN_LENGTH_DEFAULT) {
      this.errors.push({
        field: this.NAME,
        message: 'Min length must be greater than or equal to 1',
      });
    }

    if (minLength > maxLength) {
      this.errors.push({
        field: this.NAME,
        message: 'Min length must be less than or equal to max length',
      });
    }

    if (maxLength < minLength) {
      this.errors.push({
        field: this.NAME,
        message: 'Max length must be greater than or equal to min length',
      });
    }

    if (value.length < minLength || value.length > maxLength) {
      this.errors.push({
        field: this.NAME,
        message: `Value length must be between ${minLength} and ${maxLength}, but got ${value.length}`,
      });
    }
  }

  toString(): string {
    return this.#value;
  }

  equals(obj: this): boolean {
    return this.#value === obj.value;
  }
}
