import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './infrastructure/adapters/in/product.controller';
import { ProductRepositoryPort } from './domain/ports/out/product-repository.port';
import { FindProductById, FindAllProducts } from './application/queries';
import {
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
} from './application/commands';
import { ProductRepositoryAdapter } from './infrastructure/adapters/out/product-repository.adapter';
import { ProductEntity } from './infrastructure/adapters/out/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [
    {
      provide: ProductRepositoryPort,
      useClass: ProductRepositoryAdapter,
    },
    // Queries
    FindProductById,
    FindAllProducts,
    // Commands
    CreateProduct,
    UpdateProduct,
    DeleteProduct,
  ],
})
export class ProductModule {}
