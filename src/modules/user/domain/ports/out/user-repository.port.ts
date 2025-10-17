import { PaginationQueryCore, PaginationCoreResponse } from 'src/shared/types';
import { User } from '../../model/user';

export abstract class UserRepositoryPort {
  abstract save(user: User): Promise<User>;

  abstract findById(id: string): Promise<User | null>;

  abstract findByUsername(username: string): Promise<User | null>;

  abstract findByEmail(email: string): Promise<User | null>;

  abstract findAll(
    query: PaginationQueryCore,
  ): Promise<PaginationCoreResponse<User>>;

  abstract update(user: User): Promise<User>;

  abstract deleteById(id: string): Promise<boolean>;

  abstract exists(id: string): Promise<boolean>;

  abstract existsByUsername(username: string): Promise<boolean>;

  abstract existsByEmail(email: string): Promise<boolean>;

  abstract existsByUsernameOrEmail(
    username: string,
    email: string,
  ): Promise<boolean>;
}
