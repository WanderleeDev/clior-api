import { AgreementError } from 'src/shared/domain/vo/abstracts/BaseAbstract.vo';
import { TextVO } from 'src/shared/domain/vo/abstracts/TextAbstract.vo';
import { Result } from 'src/shared/utils/Result';
import { USER_CONSTANTS } from 'src/modules/user/const';

export class HashedPasswordVO extends TextVO {
  readonly NAME: string = 'hashedPassword';

  private constructor(value: string) {
    super({
      value,
      minLength: USER_CONSTANTS.BCRYPT_HASH_LENGTH,
      maxLength: USER_CONSTANTS.BCRYPT_HASH_LENGTH,
    });

    this.customConstraints();
  }

  static of(value: string): Result<HashedPasswordVO, AgreementError[]> {
    return this.safeOf(new HashedPasswordVO(value));
  }

  protected customConstraints(): void {
    const bcryptRegex = /^\$2[aby]\$\d{2}\$.{53}$/;

    if (!bcryptRegex.test(this.value)) {
      this.errors.push({
        field: this.NAME,
        message: 'Invalid bcrypt hash format',
      });
    }
  }
}
