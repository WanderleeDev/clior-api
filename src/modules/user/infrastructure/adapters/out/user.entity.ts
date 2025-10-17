import { USER_CONSTANTS } from 'src/modules/user/const';
import { BaseEntity } from 'src/shared/infra/base-entity';
import { Entity, Column } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: USER_CONSTANTS.USERNAME_MAX_LENGTH,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: USER_CONSTANTS.BCRYPT_HASH_LENGTH,
  })
  hashedPassword: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;
}
