import { PRODUCTS_CONSTANTS } from 'src/product/const';
import { AgreementError } from 'src/shared/domain/vo/abstracts/BaseAbstract.vo';
import { TextVO } from 'src/shared/domain/vo/abstracts/TextAbstract.vo';
import { Result } from 'src/shared/utils/Result';

export class NameVO extends TextVO {
  static readonly FILTER_WORDS = PRODUCTS_CONSTANTS.FILTER_WORDS;
  readonly NAME: string = 'name';

  private constructor(value: string) {
    super({
      value,
      minLength: PRODUCTS_CONSTANTS.NAME_MIN_LENGTH,
      maxLength: PRODUCTS_CONSTANTS.NAME_MAX_LENGTH,
    });

    this.customConstraints();
  }

  static of(value: string): Result<NameVO, AgreementError[]> {
    return this.safeOf(new NameVO(value));
  }

  protected customConstraints(): void {
    const listInvalidWords = NameVO.FILTER_WORDS.filter((word) =>
      this.value.toLowerCase().includes(word),
    );

    if (listInvalidWords.length > 0) {
      const listFormat = new Intl.ListFormat('en', {
        style: 'long',
        type: 'conjunction',
      }).format(listInvalidWords);
      const message = `The name cannot contain the words: ${listFormat}`;

      this.errors.push({
        field: this.NAME,
        message,
      });
    }
  }
}
