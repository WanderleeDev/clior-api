import { UuidVO } from 'src/shared/domain/vo/Uuid.vo';
import { RefreshToken, RefreshTokenArgs } from './refresh-token';
import { HashedPasswordVO } from 'src/modules/user/domain/model/vo/HashedPassword.vo';
import { collectAgreementErrors } from 'src/shared/utils/collectAgreementErrors';
import { UserDomainException } from 'src/modules/user/domain/exceptions';

export class TokenBuilder {
  static readonly ORIGIN_NAME = 'token';

  static create({
    id,
    userId,
    hashedToken,
    expiresAt,
  }: RefreshTokenArgs): RefreshToken {
    const uuidVo = UuidVO.of(id);
    const userIdVo = UuidVO.of(userId);
    const hashedTokenVo = HashedPasswordVO.of(hashedToken);

    const errors = collectAgreementErrors([uuidVo, userIdVo, hashedTokenVo]);

    if (errors.length > 0) {
      throw new UserDomainException({
        message: 'Failed to create user',
        origin: TokenBuilder.ORIGIN_NAME,
        errors,
      });
    }

    return RefreshToken.create({
      id: uuidVo.data,
      userId: userIdVo.data,
      hashedToken: hashedTokenVo.data,
      expiresAt,
    });
  }
}
