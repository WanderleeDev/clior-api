import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  CreateProductDto,
  ProductResponseDto,
  UpdateProductDto,
} from 'src/modules/product/application/dto';
import { UUID } from 'src/shared/types';
import {
  FindProductById,
  FindAllProducts,
} from 'src/modules/product/application/queries';
import {
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
} from 'src/modules/product/application/commands';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
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
import { PRODUCT_PAGINATION_CONFIG } from '../../paginate.config';

@Controller('products')
@ApiTags('Products')
export class ProductController {
  constructor(
    // Queries
    private readonly findProductById: FindProductById,
    private readonly findAllProducts: FindAllProducts,
    // Commands
    private readonly createProduct: CreateProduct,
    private readonly updateProduct: UpdateProduct,
    private readonly deleteProduct: DeleteProduct,
  ) {}

  // ========================================
  // POST
  // ========================================
  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiCreatedResponse({
    description: 'Product created successfully',
    type: ProductResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiConflictResponse({ description: 'Product already exists' })
  async create(@Body() dto: CreateProductDto): Promise<ProductResponseDto> {
    return this.createProduct.exec(dto);
  }

  // ========================================
  // GET
  // ========================================
  @Get()
  @ApiOperation({
    summary: 'List and search products with pagination and filters',
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @PaginatedSwaggerDocs(ProductResponseDto, PRODUCT_PAGINATION_CONFIG)
  async findAll(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<ProductResponseDto>> {
    return this.findAllProducts.exec(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiOkResponse({
    description: 'Product found successfully',
    type: ProductResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  async findOne(
    @Param('id', ParseUUIDPipe) id: UUID,
  ): Promise<ProductResponseDto> {
    return this.findProductById.exec(id);
  }

  // ========================================
  // PATCH
  // ========================================
  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiOkResponse({
    description: 'Product updated successfully',
    type: ProductResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  async update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() dto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    return this.updateProduct.exec(id, dto);
  }

  // ========================================
  // DELETE
  // ========================================
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiNoContentResponse({ description: 'Product deleted successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  async delete(@Param('id', ParseUUIDPipe) id: UUID): Promise<void> {
    await this.deleteProduct.exec(id);
  }
}
