import { HashedPasswordVO } from 'src/modules/user/domain/model/vo/HashedPassword.vo';
import { AgreementRoot } from 'src/shared/domain/vo/abstracts';
import { UuidVO } from 'src/shared/domain/vo/Uuid.vo';

export interface RefreshTokenArgs {
  id: string;
  userId: string;
  hashedToken: string;
  expiresAt: Date;
}

export interface CreateRefreshTokenArgs {
  id: UuidVO;
  userId: UuidVO;
  hashedToken: HashedPasswordVO;
  expiresAt: Date;
}

export class RefreshToken extends AgreementRoot<RefreshTokenArgs> {
  readonly NAME_AGREEMENT_ROOT: string = 'refresh-token';

  private constructor(
    public readonly id: UuidVO,
    public readonly userId: UuidVO,
    public readonly hashedToken: HashedPasswordVO,
    public readonly expiresAt: Date,
  ) {
    super();
  }

  static create({
    id,
    userId,
    hashedToken,
    expiresAt,
  }: CreateRefreshTokenArgs): RefreshToken {
    return new RefreshToken(id, userId, hashedToken, expiresAt);
  }

  isExpired(): boolean {
    return this.expiresAt.getTime() < Date.now();
  }

  public toJSON(): RefreshTokenArgs {
    return {
      id: this.id.value,
      userId: this.userId.value,
      hashedToken: this.hashedToken.value,
      expiresAt: this.expiresAt,
    };
  }
}
