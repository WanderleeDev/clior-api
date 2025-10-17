import { USER_CONSTANTS } from 'src/modules/user/const';
import { AgreementError } from 'src/shared/domain/vo/abstracts/BaseAbstract.vo';
import { TextVO } from 'src/shared/domain/vo/abstracts/TextAbstract.vo';
import { Result } from 'src/shared/utils/Result';

export class EmailVO extends TextVO {
  readonly NAME: string = 'email';

  private constructor(value: string) {
    super({
      value: value.toLowerCase().trim(),
      maxLength: USER_CONSTANTS.EMAIL_MAX_LENGTH,
    });

    this.customConstraints();
  }

  static of(value: string): Result<EmailVO, AgreementError[]> {
    return this.safeOf(new EmailVO(value));
  }

  protected customConstraints(): void {
    // RFC 5322 compliant email regex (simplified version)
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!emailRegex.test(this.value)) {
      this.errors.push({
        field: this.NAME,
        message: 'Invalid email format',
      });
    }

    // Check for consecutive dots
    if (/\.\./.test(this.value)) {
      this.errors.push({
        field: this.NAME,
        message: 'Email cannot contain consecutive dots',
      });
    }

    // Check if email starts or ends with a dot (before @)
    const [localPart] = this.value.split('@');
    if (localPart && (localPart.startsWith('.') || localPart.endsWith('.'))) {
      this.errors.push({
        field: this.NAME,
        message: 'Email local part cannot start or end with a dot',
      });
    }
  }
}
