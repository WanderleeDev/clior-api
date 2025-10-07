import { Result } from 'src/shared/utils/Result';

export interface AgreementError {
  field: string;
  message: string;
}

export abstract class BaseAgreementRoot {
  abstract readonly NAME: string;

  protected readonly errors: AgreementError[] = [];

  /**
   * Abstract method that must be implemented by each derived class to define
   * specific validation rules for the Value Object.
   *
   * This method is executed after initializing the properties of the derived VO
   * and must register custom errors in the `this.errors` array.
   *
   * ⚠️ This method must NOT be thrown from the base constructor, as the properties
   * of the derived class are not available at that moment. It must be called
   * explicitly in the derived class constructor, after all the necessary properties
   * are initialized.
   *
   * Example of use:
   *
   * ```ts
   * constructor(currency: string) {
   *   super();
   *
   *   this.#currency = currency as Currency;
   *   this.customConstraints();
   * }
   *
   * protected customConstraints(): void {
   *   if (this.currency !== 'USD') {
   *     this.errors.push({
   *       field: this.name,
   *       message: `Moneda inválida: ${this.currency}`,
   *     });
   *   }
   * }
   * ```
   *
   * @protected
   * @abstract
   */
  protected abstract customConstraints(): void;

  static safeOf<T extends BaseAgreementRoot>(
    valueObject: T,
  ): Result<T, AgreementError[]> {
    if (valueObject.hasErrors()) {
      return Result.fail(valueObject.getErrors());
    }

    return Result.ok(valueObject);
  }

  public hasErrors(): boolean {
    return Object.keys(this.errors).length > 0;
  }

  public getErrors(): AgreementError[] {
    return this.errors;
  }

  abstract toString(): string;

  abstract equals(obj: this): boolean;
}

export abstract class AgreementRoot<T> {
  abstract readonly NAME_AGREEMENT_ROOT: string;

  public abstract toJSON(): T;
}
