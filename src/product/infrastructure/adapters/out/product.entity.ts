import { PRODUCTS_CONSTANTS } from 'src/product/const';
import { Currency, StockStatus } from 'src/product/domain/enum';

import {
  Entity,
  Column,
  PrimaryColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';

@Entity('products')
@Index(['name', 'description'])
export class ProductEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    length: PRODUCTS_CONSTANTS.NAME_MAX_LENGTH,
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: PRODUCTS_CONSTANTS.DESCRIPTION_MAX_LENGTH,
    nullable: true,
  })
  description: string | null;

  @Column('decimal', {
    precision: PRODUCTS_CONSTANTS.PRICE_PRECISION,
    scale: PRODUCTS_CONSTANTS.PRICE_SCALE,
  })
  price: number;

  @Column({
    type: 'enum',
    enum: Currency,
    default: PRODUCTS_CONSTANTS.DEFAULT_CURRENCY,
  })
  currency: Currency;

  @Column({ default: PRODUCTS_CONSTANTS.STOCK_MIN_VALUE })
  stock: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  thumbnail: string | null;

  @Column({
    type: 'enum',
    enum: StockStatus,
    default: StockStatus.AVAILABLE,
  })
  status: StockStatus;

  @DeleteDateColumn()
  deletedAt?: Date;
}
