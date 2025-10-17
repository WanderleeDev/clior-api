import { User } from 'src/modules/user/domain/model/user';
import { UserResponseDto } from '../dto';
import { UserEntity } from 'src/modules/user/infrastructure/adapters/out/user.entity';
import { Paginated } from 'nestjs-paginate';
import { PaginationCoreResponse } from 'src/shared/types';
import { UserBuilder } from 'src/modules/user/domain/user.builder';

export class UserMapper {
  static modelToResponseDto(user: User): UserResponseDto {
    return {
      id: user.id.value,
      username: user.username.value,
      email: user.email.value,
    };
  }

  static modelToOrm(user: User): UserEntity {
    const entity = new UserEntity();

    entity.id = user.id.value;
    entity.username = user.username.value;
    entity.hashedPassword = user.hashedPassword.value;
    entity.email = user.email.value;

    return entity;
  }

  static ormToModel(entity: UserEntity): User {
    return UserBuilder.create({
      id: entity.id,
      username: entity.username,
      hashedPassword: entity.hashedPassword,
      email: entity.email,
    });
  }

  static ormToModelPaginate(
    result: PaginationCoreResponse<UserEntity>,
  ): PaginationCoreResponse<User> {
    return {
      ...result,
      data: result.data.map((entity) => this.ormToModel(entity)),
    };
  }

  static modelToResponseDtoPaginate(
    result: PaginationCoreResponse<User>,
  ): Paginated<UserResponseDto> {
    return {
      ...result,
      data: result.data.map((user) => this.modelToResponseDto(user)),
    } as Paginated<UserResponseDto>;
  }
}
