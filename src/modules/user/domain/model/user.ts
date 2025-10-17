import { AgreementRoot, AgreementError } from 'src/shared/domain/vo/abstracts';
import { UuidVO } from 'src/shared/domain/vo/Uuid.vo';
import { Result } from 'src/shared/utils/Result';
import {
  UserArgs,
  CreateUserArgs,
  UserUpdateArgs,
  RestoreUserArgs,
} from './types';
import { HashedPasswordVO } from './vo/HashedPassword.vo';
import { UsernameVO } from './vo/Username.vo';
import { EmailVO } from './vo/Email.vo';

export class User extends AgreementRoot<UserArgs> {
  readonly NAME_AGREEMENT_ROOT: string = 'user';

  private constructor(
    public readonly id: UuidVO,
    public readonly username: UsernameVO,
    public readonly hashedPassword: HashedPasswordVO,
    public readonly email: EmailVO,
    public readonly createdAt: Date,
    public readonly updatedAt: Date | null,
    public readonly deletedAt: Date | null,
  ) {
    super();
  }

  static create({ id, username, hashedPassword, email }: CreateUserArgs): User {
    return new User(
      id,
      username,
      hashedPassword,
      email,
      new Date(),
      null,
      null,
    );
  }

  static restore(args: RestoreUserArgs): User {
    return new User(
      args.id,
      args.username,
      args.hashedPassword,
      args.email,
      args.createdAt,
      args.updatedAt,
      args.deletedAt,
    );
  }

  public changeUsername(value: string): Result<User, AgreementError[]> {
    const newUsername = UsernameVO.of(value);

    if (newUsername.hasError) {
      return Result.fail(newUsername.error!);
    }

    return Result.ok(
      new User(
        this.id,
        newUsername.data,
        this.hashedPassword,
        this.email,
        this.createdAt,
        new Date(),
        this.deletedAt,
      ),
    );
  }

  public changePassword(
    hashedPassword: string,
  ): Result<User, AgreementError[]> {
    const newPassword = HashedPasswordVO.of(hashedPassword);

    if (newPassword.hasError) {
      return Result.fail(newPassword.error!);
    }

    return Result.ok(
      new User(
        this.id,
        this.username,
        newPassword.data,
        this.email,
        this.createdAt,
        new Date(),
        this.deletedAt,
      ),
    );
  }

  public update(args: UserUpdateArgs): Result<User, AgreementError[]> {
    if (
      Object.keys(args).length === 0 ||
      Object.values(args).every((value) => value === undefined)
    ) {
      return Result.fail([
        {
          field: 'update',
          message: 'No arguments provided',
        },
      ]);
    }

    const usernameResult: Result<UsernameVO, AgreementError[]> =
      args.username !== undefined
        ? UsernameVO.of(args.username)
        : Result.ok(this.username);

    const passwordResult: Result<HashedPasswordVO, AgreementError[]> =
      args.hashedPassword !== undefined
        ? HashedPasswordVO.of(args.hashedPassword)
        : Result.ok(this.hashedPassword);

    const errors: AgreementError[] = [];

    if (usernameResult.hasError) errors.push(...usernameResult.error!);
    if (passwordResult.hasError) errors.push(...passwordResult.error!);

    if (errors.length > 0) {
      return Result.fail(errors);
    }

    return Result.ok(
      new User(
        this.id,
        usernameResult.data,
        passwordResult.data,
        this.email,
        this.createdAt,
        new Date(),
        this.deletedAt,
      ),
    );
  }

  public toJSON(): UserArgs {
    return {
      id: this.id.value,
      username: this.username.value,
      hashedPassword: this.hashedPassword.value,
      email: this.email.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
