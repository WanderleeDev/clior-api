import { UuidVO } from 'src/shared/domain/vo/Uuid.vo';
import { UsernameVO } from './vo/Username.vo';
import { HashedPasswordVO } from './vo/HashedPassword.vo';
import { EmailVO } from './vo/Email.vo';

export interface UserArgs {
  id: string;
  username: string;
  hashedPassword: string;
  email: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export type CreateUserArgs = {
  id: UuidVO;
  username: UsernameVO;
  hashedPassword: HashedPasswordVO;
  email: EmailVO;
};

export type RestoreUserArgs = CreateUserArgs & {
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

export type UserUpdateArgs = {
  username?: string;
  hashedPassword?: string;
};

export type UserPrimitives = {
  id: string;
  username: string;
  hashedPassword: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
