import { BaseAgreementRoot } from './BaseAbstract.vo';

export interface NumberVoArgs {
  value: number;
  min?: number;
  max?: number;
}

/**
 * Class that represents a value object for a number.
 * It has a minimum and maximum value, and it can validate the type and range of the value.
 * @abstract
 */
export abstract class NumberVO extends BaseAgreementRoot {
  static readonly MAX_VALUE_DEFAULT = 999_999_999;
  static readonly MIN_VALUE_DEFAULT = 0;

  readonly #value: number;
  readonly #min: number;
  readonly #max: number;

  constructor({
    value,
    min = NumberVO.MIN_VALUE_DEFAULT,
    max = NumberVO.MAX_VALUE_DEFAULT,
  }: NumberVoArgs) {
    super();

    this.#min = min;
    this.#max = max;
    this.#value = value;
    this.validateBase();
  }

  get value(): number {
    return this.#value;
  }

  get minValue(): number {
    return this.#min;
  }

  get maxValue(): number {
    return this.#max;
  }

  private validateBase(): void {
    if (this.#value < this.#min || this.#value > this.#max) {
      this.errors.push({
        field: this.NAME,
        message: `Value ${this.#value} is out of range. Min: ${this.#min}, Max: ${this.#max}`,
      });
    }
  }

  public equals(obj: this): boolean {
    return this.#value === obj.value;
  }

  public toString(): string {
    return this.#value.toString();
  }
}
