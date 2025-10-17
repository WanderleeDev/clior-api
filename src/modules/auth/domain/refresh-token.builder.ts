import { RefreshToken, RefreshTokenArgs } from './model/refresh-token';
import { UuidVO } from 'src/shared/domain/vo/Uuid.vo';
import { HashedPasswordVO } from 'src/modules/user/domain/model/vo/HashedPassword.vo';
import { collectAgreementErrors } from 'src/shared/utils/collectAgreementErrors';
import { AuthDomainException } from './exceptions/auth-domain.exception';

export class RefreshTokenBuilder {
  static create({
    id,
    userId,
    hashedToken,
    expiresAt,
  }: RefreshTokenArgs): RefreshToken {
    const idVo = UuidVO.of(id);
    const userIdVo = UuidVO.of(userId);
    const hashedTokenVo = HashedPasswordVO.of(hashedToken);

    const propertiesNotNull = [idVo, userIdVo, hashedTokenVo];
    const errors = collectAgreementErrors(propertiesNotNull);

    if (errors.length > 0) {
      throw new AuthDomainException({
        message: 'RefreshToken is not valid',
        origin: 'refresh-token',
        errors,
      });
    }

    return RefreshToken.create({
      id: idVo.data,
      userId: userIdVo.data,
      hashedToken: hashedTokenVo.data,
      expiresAt,
    });
  }
}
