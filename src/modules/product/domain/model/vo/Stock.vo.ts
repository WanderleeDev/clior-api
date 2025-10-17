import { PRODUCTS_CONSTANTS } from 'src/modules/product/const';
import { AgreementError } from 'src/shared/domain/vo/abstracts/BaseAbstract.vo';
import {
  NumberVO,
  NumberVoArgs,
} from 'src/shared/domain/vo/abstracts/NumberAbstract.vo';
import { Result } from 'src/shared/utils/Result';
import { StockStatus } from '../../enum';

type StockProps = NumberVoArgs & {
  status?: StockStatus;
};

export class StockVO extends NumberVO {
  readonly NAME: string = 'stock';
  readonly #status: StockStatus;

  private constructor({
    value,
    status = StockStatus.AVAILABLE,
    max = PRODUCTS_CONSTANTS.STOCK_MAX_VALUE,
    min = PRODUCTS_CONSTANTS.STOCK_MIN_VALUE,
  }: StockProps) {
    super({ value, min, max });

    this.#status = status;
    this.customConstraints();
  }

  public static of({
    value,
    status,
    max,
    min,
  }: StockProps): Result<StockVO, AgreementError[]> {
    return this.safeOf(new StockVO({ value, status, max, min }));
  }

  get status(): StockStatus {
    return this.#status;
  }

  protected customConstraints(): void {
    if (!Object.values(StockStatus).includes(this.#status)) {
      this.errors.push({
        field: this.NAME,
        message: 'Invalid stock status',
      });
    }

    if (!Number.isInteger(this.value)) {
      this.errors.push({
        field: this.NAME,
        message: 'Stock value must be an integer',
      });
    }

    if (this.value < this.minValue) {
      this.errors.push({
        field: this.NAME,
        message: 'Stock is insufficient',
      });
    }

    if (this.value > this.maxValue) {
      this.errors.push({
        field: this.NAME,
        message: 'Stock overflow',
      });
    }
  }

  public decrement(amount: number): Result<StockVO, AgreementError[]> {
    return StockVO.of({
      value: this.value - amount,
      max: this.maxValue,
      min: this.minValue,
      status: this.updateStatus(),
    });
  }

  public increment(amount: number): Result<StockVO, AgreementError[]> {
    return StockVO.of({
      value: this.value + amount,
      max: this.maxValue,
      min: this.minValue,
      status: this.updateStatus(),
    });
  }

  public isAvailable(): boolean {
    return this.value > this.minValue;
  }

  public isFull(): boolean {
    return this.value === this.maxValue;
  }

  private updateStatus(): StockStatus {
    return this.value <= this.minValue
      ? StockStatus.UNAVAILABLE
      : StockStatus.AVAILABLE;
  }

  public percentageUsed(): number {
    return (this.value / this.maxValue) * 100;
  }
}
