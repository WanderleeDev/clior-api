import { TextVO } from 'src/shared/domain/vo/abstracts/TextAbstract.vo';
import { PRODUCTS_CONSTANTS } from 'src/product/const';
import { AgreementError } from 'src/shared/domain/vo/abstracts/BaseAbstract.vo';
import { Result } from 'src/shared/utils/Result';

export class DescriptionVO extends TextVO {
  readonly NAME: string = 'description';

  static readonly FILTER_WORDS = PRODUCTS_CONSTANTS.FILTER_WORDS;

  private constructor(value: string) {
    super({
      value,
      minLength: PRODUCTS_CONSTANTS.DESCRIPTION_MIN_LENGTH,
      maxLength: PRODUCTS_CONSTANTS.DESCRIPTION_MAX_LENGTH,
    });
  }

  static of(value: string): Result<DescriptionVO, AgreementError[]> {
    return this.safeOf(new DescriptionVO(value));
  }

  protected customConstraints(): void {
    const listInvalidWords = DescriptionVO.FILTER_WORDS.filter((word) =>
      this.value.toLowerCase().includes(word),
    );

    if (listInvalidWords.length > 0) {
      const listFormat = new Intl.ListFormat('en', {
        style: 'long',
        type: 'conjunction',
      }).format(listInvalidWords);
      const message = `The description cannot contain the words: ${listFormat}`;

      this.errors.push({
        field: this.NAME,
        message,
      });
    }
  }
}
