import { USER_CONSTANTS } from 'src/modules/user/const';
import { AgreementError } from 'src/shared/domain/vo/abstracts/BaseAbstract.vo';
import { TextVO } from 'src/shared/domain/vo/abstracts/TextAbstract.vo';
import { Result } from 'src/shared/utils/Result';

export class UsernameVO extends TextVO {
  readonly NAME: string = 'username';

  private constructor(value: string) {
    super({
      value,
      minLength: USER_CONSTANTS.USERNAME_MIN_LENGTH,
      maxLength: USER_CONSTANTS.USERNAME_MAX_LENGTH,
    });

    this.customConstraints();
  }

  static of(value: string): Result<UsernameVO, AgreementError[]> {
    return this.safeOf(new UsernameVO(value));
  }

  protected customConstraints(): void {
    const usernameRegex = /^[a-zA-Z0-9_-]+$/;

    if (!usernameRegex.test(this.value)) {
      this.errors.push({
        field: this.NAME,
        message:
          'Username can only contain letters, numbers, underscores, and hyphens',
      });
    }

    if (/^[-_]|[-_]$/.test(this.value)) {
      this.errors.push({
        field: this.NAME,
        message: 'Username cannot start or end with hyphens or underscores',
      });
    }
  }
}
