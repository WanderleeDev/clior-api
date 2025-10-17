import { UuidVO } from 'src/shared/domain/vo/Uuid.vo';
import { UserArgs } from './model/types';
import { User } from './model/user';
import { HashedPasswordVO } from './model/vo/HashedPassword.vo';
import { UsernameVO } from './model/vo/Username.vo';
import { EmailVO } from './model/vo/Email.vo';
import { collectAgreementErrors } from 'src/shared/utils/collectAgreementErrors';
import { UserDomainException } from './exceptions/UserDomainException';

export class UserBuilder {
  static readonly ORIGIN_NAME = 'user';

  static create({
    id,
    username,
    hashedPassword,
    email,
  }: Pick<UserArgs, 'id' | 'username' | 'hashedPassword' | 'email'>): User {
    const uuidVo = UuidVO.of(id);
    const usernameVo = UsernameVO.of(username);
    const hashedPasswordVo = HashedPasswordVO.of(hashedPassword);
    const emailVo = EmailVO.of(email);

    const errors = collectAgreementErrors([
      uuidVo,
      usernameVo,
      hashedPasswordVo,
      emailVo,
    ]);

    if (errors.length > 0) {
      throw new UserDomainException({
        message: 'Failed to create user',
        origin: UserBuilder.ORIGIN_NAME,
        errors,
      });
    }

    return User.create({
      id: uuidVo.data,
      username: usernameVo.data,
      hashedPassword: hashedPasswordVo.data,
      email: emailVo.data,
    });
  }

  static restore({
    id,
    username,
    hashedPassword,
    email,
    createdAt,
    updatedAt,
    deletedAt,
  }: UserArgs): User {
    const uuidVo = UuidVO.of(id);
    const usernameVo = UsernameVO.of(username);
    const hashedPasswordVo = HashedPasswordVO.of(hashedPassword);
    const emailVo = EmailVO.of(email);

    const errors = collectAgreementErrors([
      uuidVo,
      usernameVo,
      hashedPasswordVo,
      emailVo,
    ]);

    if (errors.length > 0) {
      throw new UserDomainException({
        message: 'Failed to restore user from database',
        origin: UserBuilder.ORIGIN_NAME,
        errors,
      });
    }

    return User.restore({
      id: uuidVo.data,
      username: usernameVo.data,
      hashedPassword: hashedPasswordVo.data,
      email: emailVo.data,
      createdAt,
      updatedAt,
      deletedAt,
    });
  }
}
