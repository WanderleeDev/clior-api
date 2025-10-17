import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from 'src/modules/user/domain/ports/out/user-repository.port';
import { User } from 'src/modules/user/domain/model/user';
import { UserMapper } from 'src/modules/user/application/mapper/user.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { paginate } from 'nestjs-paginate';
import { USER_PAGINATION_CONFIG } from '../../paginate.config';
import { PaginationCoreResponse, PaginationQueryCore } from 'src/shared/types';

@Injectable()
export class UserRepositoryAdapter implements UserRepositoryPort {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async save(user: User): Promise<User> {
    const entity = UserMapper.modelToOrm(user);
    const savedEntity = await this.repository.save(entity);

    return UserMapper.ormToModel(savedEntity);
  }

  async findById(id: string): Promise<User | null> {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) return null;

    return UserMapper.ormToModel(entity);
  }

  async findByUsername(username: string): Promise<User | null> {
    const entity = await this.repository.findOneBy({ username });

    if (!entity) return null;

    return UserMapper.ormToModel(entity);
  }

  async findAll(
    query: PaginationQueryCore,
  ): Promise<PaginationCoreResponse<User>> {
    const result = await paginate(
      query,
      this.repository,
      USER_PAGINATION_CONFIG,
    );

    return UserMapper.ormToModelPaginate(result);
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.repository.findOneBy({ email });

    if (!entity) return null;

    return UserMapper.ormToModel(entity);
  }

  async update(user: User): Promise<User> {
    const entity = UserMapper.modelToOrm(user);
    const updated = await this.repository.save(entity);

    return UserMapper.ormToModel(updated);
  }

  async deleteById(id: string): Promise<boolean> {
    const entity = await this.repository.softDelete({ id });

    return entity.affected !== undefined && entity.affected > 0;
  }

  async existsByUsername(username: string): Promise<boolean> {
    return this.repository.exists({ where: { username } });
  }

  async existsByEmail(email: string): Promise<boolean> {
    return this.repository.exists({ where: { email } });
  }

  async exists(id: string): Promise<boolean> {
    return this.repository.exists({ where: { id } });
  }

  async existsByUsernameOrEmail(
    username: string,
    email: string,
  ): Promise<boolean> {
    return this.repository.exists({ where: [{ username }, { email }] });
  }
}
