import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UserRepositoryPort } from 'src/modules/user/domain/ports/out/user-repository.port';
import { UpdateUserDto, UserResponseDto } from '../dto';
import { UserMapper } from '../mapper/user.mapper';
import * as bcrypt from 'bcrypt';
import { USER_CONSTANTS } from 'src/modules/user/const';

@Injectable()
export class UpdateUser {
  constructor(private readonly repo: UserRepositoryPort) {}

  async exec(id: string, dto: UpdateUserDto): Promise<UserResponseDto> {
    // Buscar el usuario
    const user = await this.repo.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Si se está actualizando el username, verificar que no exista
    if (dto.username && dto.username !== user.username.value) {
      const existingUser = await this.repo.existsByUsername(dto.username);
      if (existingUser) {
        throw new ConflictException('Username already exists');
      }
    }

    // Preparar datos de actualización
    const updateData: { username?: string; hashedPassword?: string } = {};

    if (dto.username) {
      updateData.username = dto.username;
    }

    if (dto.password) {
      updateData.hashedPassword = await bcrypt.hash(
        dto.password,
        USER_CONSTANTS.BCRYPT_SALT_ROUNDS,
      );
    }

    // Actualizar el usuario
    const updateResult = user.update(updateData);
    if (updateResult.hasError) {
      throw new Error(
        `Failed to update user: ${JSON.stringify(updateResult.error)}`,
      );
    }

    const updatedUser = await this.repo.update(user);

    return UserMapper.modelToResponseDto(updatedUser);
  }
}
