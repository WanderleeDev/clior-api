import { BaseEntity } from 'src/shared/infra/base-entity';
import { Column, Entity } from 'typeorm';

@Entity('refresh_tokens')
export class RefreshTokenEntity extends BaseEntity {
  @Column('uuid')
  userId: string;

  @Column('varchar', { length: 255 })
  hashedToken: string;

  @Column({ type: 'timestamp' })
  expiresAt: Date;
}
