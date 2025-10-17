import {
  Controller,
  Get,
  Body,
  Param,
  ParseUUIDPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  UserResponseDto,
  UpdateUserDto,
} from 'src/modules/user/application/dto';
import { UUID } from 'src/shared/types';
import {
  FindUserById,
  FindAllUsers,
} from 'src/modules/user/application/queries';
import { UpdateUser, DeleteUser } from 'src/modules/user/application/commands';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  Paginate,
  Paginated,
  PaginatedSwaggerDocs,
  PaginateQuery,
} from 'nestjs-paginate';
import { USER_PAGINATION_CONFIG } from '../../paginate.config';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(
    // Queries
    private readonly findUserById: FindUserById,
    private readonly findAllUsers: FindAllUsers,
    // Commands
    private readonly updateUser: UpdateUser,
    private readonly deleteUser: DeleteUser,
  ) {}

  // ========================================
  // GET
  // ========================================
  @Get()
  @ApiOperation({
    summary: 'List and search users with pagination and filters',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @PaginatedSwaggerDocs(UserResponseDto, USER_PAGINATION_CONFIG)
  async findAll(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<UserResponseDto>> {
    return this.findAllUsers.exec(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiOkResponse({
    description: 'User found successfully',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async findOne(
    @Param('id', ParseUUIDPipe) id: UUID,
  ): Promise<UserResponseDto> {
    return this.findUserById.exec(id);
  }

  // ========================================
  // PATCH
  // ========================================
  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiOkResponse({
    description: 'User updated successfully',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiConflictResponse({ description: 'Username already exists' })
  async update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.updateUser.exec(id, dto);
  }

  // ========================================
  // DELETE
  // ========================================
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiNoContentResponse({ description: 'User deleted successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async delete(@Param('id', ParseUUIDPipe) id: UUID): Promise<void> {
    await this.deleteUser.exec(id);
  }
}
