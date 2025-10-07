import { PRODUCTS_CONSTANTS } from 'src/product/const';
import { AgreementError } from 'src/shared/domain/vo/abstracts/BaseAbstract.vo';
import { TextVO } from 'src/shared/domain/vo/abstracts/TextAbstract.vo';

import { Result } from 'src/shared/utils/Result';

export class ThumbnailVO extends TextVO {
  static readonly REGEX_THUMBNAIL = /\.(jpg|jpeg|png|gif|webp|svg)$/i;
  readonly NAME = 'thumbnail';

  private constructor(value: string) {
    super({
      value,
      minLength: PRODUCTS_CONSTANTS.THUMBNAIL_MIN_LENGTH,
      maxLength: PRODUCTS_CONSTANTS.THUMBNAIL_MAX_LENGTH,
    });
  }

  static of(value: string): Result<ThumbnailVO, AgreementError[]> {
    return this.safeOf(new ThumbnailVO(value));
  }

  protected customConstraints(): void {
    if (!ThumbnailVO.REGEX_THUMBNAIL.test(this.value)) {
      this.errors.push({
        field: this.NAME,
        message: 'Invalid thumbnail format.',
      });
    }
  }
}
