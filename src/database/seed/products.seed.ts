import 'dotenv/config';

import { faker } from '@faker-js/faker';
import { Currency, StockStatus } from 'src/product/domain/enum';
import { ProductEntity } from 'src/product/infrastructure/adapters/out/product.entity';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../dataSourceOptions';

const SEED_ARG = process.env.SEED_ARG;

export async function seddingProducts() {
  const datasource = new DataSource(dataSourceOptions);
  await datasource.initialize();

  if (!SEED_ARG) {
    throw new Error('SEED_ARG is required');
  }

  faker.seed(Number(SEED_ARG));

  try {
    const productsPlain: ProductEntity[] = Array.from(
      { length: 200 },
      (_, i) => ({
        id: faker.string.uuid(),
        productId: faker.string.uuid(),
        name: `${faker.commerce.product()}-${i}`,
        price: Number(faker.commerce.price()),
        description:
          Math.random() > 0.5 ? null : faker.commerce.productDescription(),
        currency: Currency.USD,
        stock: faker.number.int({ min: 0, max: 100 }),
        thumbnail: faker.image.url(),
        status:
          Math.random() > 0.5 ? StockStatus.AVAILABLE : StockStatus.UNAVAILABLE,
      }),
    );
    const products = productsPlain.map((p) =>
      Object.assign(new ProductEntity(), p),
    );

    const repository = datasource.getRepository(ProductEntity);
    await repository.save(products);

    console.log('Products seeded successfully');
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  } finally {
    await datasource.destroy();
  }
}

seddingProducts();
