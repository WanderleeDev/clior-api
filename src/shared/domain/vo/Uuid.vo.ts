import { Result } from 'src/shared/utils/Result';
import { TextVO } from './abstracts/TextAbstract.vo';
import { AgreementError } from './abstracts/BaseAbstract.vo';

export class UuidVO extends TextVO {
  static readonly UUID_LENGTH = 36;
  static readonly REGEX_UUID =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  readonly NAME: string = 'uuid';

  private constructor(value: string) {
    super({
      value,
      minLength: UuidVO.UUID_LENGTH,
      maxLength: UuidVO.UUID_LENGTH,
    });
  }

  static of(value: string): Result<UuidVO, AgreementError[]> {
    return this.safeOf(new UuidVO(value));
  }

  protected customConstraints(): void {
    if (!UuidVO.REGEX_UUID.test(this.value)) {
      this.errors.push({
        field: this.NAME,
        message: 'Invalid uuid format.',
      });
    }
  }
}
