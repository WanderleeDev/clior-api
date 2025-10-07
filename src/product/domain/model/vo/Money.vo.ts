import { PRODUCTS_CONSTANTS } from 'src/product/const';
import { AgreementError } from 'src/shared/domain/vo/abstracts/BaseAbstract.vo';
import { NumberVO } from 'src/shared/domain/vo/abstracts/NumberAbstract.vo';
import { Result } from 'src/shared/utils/Result';
import { Locale, Currency } from '../../enum';

export type MoneyArgs = {
  value: number;
  currency: Currency;
};

export class MoneyVO extends NumberVO {
  readonly NAME: string = 'money';
  readonly #currency: Currency;

  private constructor({
    value,
    currency = PRODUCTS_CONSTANTS.DEFAULT_CURRENCY,
  }: MoneyArgs) {
    super({
      value,
      min: PRODUCTS_CONSTANTS.PRICE_MIN_VALUE,
      max: PRODUCTS_CONSTANTS.PRICE_MAX_SAFE_VALUE,
    });

    this.#currency = currency;
    this.customConstraints();
  }

  public static of(args: MoneyArgs): Result<MoneyVO, AgreementError[]> {
    return this.safeOf(new MoneyVO(args));
  }

  get currency(): Currency {
    return this.#currency;
  }

  protected customConstraints(): void {
    if (!MoneyVO.isValidCurrency(this.#currency)) {
      this.errors.push({
        field: this.NAME,
        message: 'Currency not supported',
      });
    }
  }

  public formatterValue(): string {
    return new Intl.NumberFormat(Locale[this.#currency], {
      style: 'currency',
      currency: this.#currency,
    }).format(this.value);
  }

  static isValidCurrency(currency: unknown): currency is Currency {
    return (
      typeof currency === 'string' &&
      Object.values(Currency).includes(currency as Currency)
    );
  }
}
