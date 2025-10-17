// import { Injectable } from '@nestjs/common';
// import { ProductRepositoryPort } from '../../../domain/ports/out/product-repository.port';
// import { ProductMapper } from 'src/product/application/mapper/product.mapper';
// import { ProductEntity } from './product.entity';
// import { faker } from '@faker-js/faker';
// import { Product } from 'src/product/domain/model/product';
// import { Currency, StockStatus } from 'src/product/domain/enum';
// import { PaginateBase, Pagination } from 'src/shared/types';

// export class ProductRepositoryMockup implements ProductRepositoryPort {
//   #products: ProductEntity[] = Array.from({ length: 50 }, () => ({
//     id: faker.string.uuid(),
//     productId: faker.string.uuid(),
//     name: faker.commerce.product(),
//     price: Number(faker.commerce.price()),
//     description:
//       Math.random() > 0.5 ? null : faker.commerce.productDescription(),
//     currency: Currency.USD,
//     stock: faker.number.int({ min: 0, max: 100 }),
//     thumbnail: faker.image.url(),
//     status:
//       Math.random() > 0.5 ? StockStatus.AVAILABLE : StockStatus.UNAVAILABLE,
//   }));

//   async save(product: Product): Promise<Product> {
//     const entity = ProductMapper.modelToOrm(product);
//     this.#products.push(entity);

//     return Promise.resolve(ProductMapper.ormToModel(entity));
//   }

//   async readById(id: string): Promise<Product | null> {
//     const product = this.#products.find((product) => product.id === id);

//     return Promise.resolve(product ? ProductMapper.ormToModel(product) : null);
//   }

//   async readAll(page: number, limit: number): Promise<PaginateBase<Product>> {
//     throw new Error('Method not implemented.');
//   }

//   async search(query: Pagination): Promise<PaginateBase<Product>> {
//     const result: ProductEntity[] = this.#products
//       .filter((p) => p.name.toLowerCase().includes(query.search!.toLowerCase()))
//       .filter((p) => {
//         if (query.filter) {
//           const filters = Object.entries(query.filter);

//           return filters.every(([key, value]) => {
//             if (key === 'price' && value.length > 0) {
//               const [min, max] = value;
//               return p.price >= Number(min) && p.price <= Number(max);
//             }

//             if (key === 'stock' && value.length > 0) {
//               const [min, max] = value;
//               return p.stock >= Number(min) && p.stock <= Number(max);
//             }

//             return p[key as keyof ProductEntity] === value;
//           });
//         }
//         return true;
//       });

//     return Promise.resolve({
//       data: [...result]
//         .sort((a, b) => a.name.localeCompare(b.name))
//         .map((p) => ProductMapper.ormToModel(p)),
//       meta: {
//         itemsPerPage: query.limit ?? 10,
//         totalItems: this.#products.length,
//         currentPage: query.page ?? 1,
//         totalPages: Math.ceil(this.#products.length / (query.limit ?? 10)),
//         search: query.search ?? '',
//         select: query.select ?? [],
//         filter: query.filter ?? {},
//         cursor: query.cursor ?? '',
//       },
//       links: {
//         first: '',
//         previous: '',
//         current: '',
//         next: '',
//         last: '',
//       },
//     });
//   }

//   async deleteById(id: string): Promise<boolean> {
//     const product = this.#products.find((p) => p.id === id);

//     if (!product) return Promise.resolve(false);

//     this.#products = this.#products.filter((p) => p.id !== id);

//     return Promise.resolve(true);
//   }

//   async update(product: Product): Promise<Product> {
//     const entity = ProductMapper.modelToOrm(product);

//     this.#products = this.#products.map((p) =>
//       p.id === product.id.value ? entity : p,
//     );

//     return Promise.resolve(ProductMapper.ormToModel(entity));
//   }

//   async exists(id: string): Promise<boolean> {
//     const existProduct = this.#products.find((p) => p.id === id);

//     return Promise.resolve(existProduct !== undefined);
//   }

//   async existsByName(name: string): Promise<boolean> {
//     const product = this.#products.find((p) => p.name === name);

//     return Promise.resolve(product !== undefined);
//   }
// }
