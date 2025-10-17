# Product Module

## 📋 Overview

This module implements the **Product** domain following **Clean Architecture** and **CQRS** patterns.

---

## 🏗️ Architecture

```
product/
├── application/          # Application Layer (Use Cases)
│   ├── commands/        # Write operations (CUD)
│   ├── queries/         # Read operations (R)
│   ├── dto/            # Data Transfer Objects
│   └── mapper/         # Domain ↔ DTO conversions
├── domain/              # Domain Layer (Business Logic)
│   ├── model/          # Aggregates & Value Objects
│   ├── ports/          # Repository interfaces
│   ├── exceptions/     # Domain exceptions
│   └── enum/           # Domain enumerations
└── infrastructure/      # Infrastructure Layer (Adapters)
    └── adapters/
        ├── in/         # Input adapters (Controllers)
        └── out/        # Output adapters (Repositories)
```

---

## 🔄 CQRS Pattern

### **Commands** (Write Operations)
Commands modify the system state and don't return data (except confirmation).

- `CreateProduct` - Creates a new product
- `UpdateProduct` - Updates an existing product
- `DeleteProduct` - Soft deletes a product

### **Queries** (Read Operations)
Queries read data without modifying state.

- `FindProductById` - Finds a single product by ID
- `FindAllProducts` - Lists/searches products with pagination and filters

---

## 🌐 API Endpoints

### **Products**

| Method | Endpoint | Use Case | Description |
|--------|----------|----------|-------------|
| `GET` | `/products` | `FindAllProducts` | List/search products with pagination |
| `GET` | `/products/:id` | `FindProductById` | Get a single product by ID |
| `POST` | `/products` | `CreateProduct` | Create a new product |
| `PATCH` | `/products/:id` | `UpdateProduct` | Update a product |
| `DELETE` | `/products/:id` | `DeleteProduct` | Delete a product (soft delete) |

---

## 🔍 Query Features

### **FindAllProducts** supports:

#### **Pagination**
```http
GET /products?page=1&limit=10
```

#### **Sorting**
```http
GET /products?sortBy=price:DESC&sortBy=name:ASC
```

#### **Search**
```http
GET /products?search=laptop
```
Searches in: `name`

#### **Filters**
```http
# Price range
GET /products?filter.price=$gte:100&filter.price=$lte:500

# Currency
GET /products?filter.currency=$eq:USD

# Stock
GET /products?filter.stock=$gte:10

# Status
GET /products?filter.status=$eq:AVAILABLE
```

#### **Combined**
```http
GET /products?search=laptop&filter.price=$gte:100&filter.currency=$eq:USD&sortBy=price:DESC&page=1&limit=20
```

---

## 🏛️ Domain Model

### **Product Aggregate**

```typescript
Product {
  id: UUID
  name: Name (VO)
  description: Description (VO)
  price: Money (VO)
  stock: Stock (VO)
  thumbnail: Thumbnail (VO)
  currency: Currency (Enum)
  status: StockStatus (Enum)
}
```

### **Value Objects**

- `Name` - Product name with validation
- `Description` - Optional product description
- `Money` - Price with currency
- `Stock` - Stock quantity with business rules
- `Thumbnail` - Product image URL

### **Enumerations**

- `Currency` - USD, EUR, MXN, etc.
- `StockStatus` - AVAILABLE, UNAVAILABLE

---

## 🔧 Business Rules

### **Product Creation**
- Name is required (3-100 characters)
- Price must be non-negative
- Stock must be non-negative integer
- Currency must be supported
- Thumbnail URL is required

### **Stock Management**
- Cannot decrement below 0
- Cannot exceed maximum stock limit
- Auto-updates status based on quantity

### **Product Update**
- All fields are optional
- Validates same rules as creation
- Cannot update deleted products

### **Product Deletion**
- Soft delete (sets deletedAt timestamp)
- Deleted products are hidden from queries
- Can be restored if needed

---

## 🧪 Testing

### **Unit Tests**
```bash
npm run test -- product
```

### **E2E Tests**
```bash
npm run test:e2e -- product
```

---

## 📦 Dependencies

- `@nestjs/common` - NestJS core
- `@nestjs/typeorm` - Database ORM
- `nestjs-paginate` - Pagination utilities
- `class-validator` - DTO validation
- `class-transformer` - Object transformation

---

## 🚀 Usage Examples

### **Create a Product**
```typescript
POST /products
{
  "name": "Laptop HP",
  "description": "High performance laptop",
  "price": 999.99,
  "currency": "USD",
  "stock": 50,
  "thumbnail": "https://example.com/laptop.jpg"
}
```

### **Search Products**
```typescript
GET /products?search=laptop&filter.price=$lte:1000&sortBy=price:ASC
```

### **Update Product**
```typescript
PATCH /products/:id
{
  "price": 899.99,
  "stock": 45
}
```

---

## 🔐 Security

- All IDs are validated as UUIDs
- Input validation using DTOs
- Business rules enforced in domain layer
- Soft deletes prevent data loss

---

## 📚 Additional Resources

- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [CQRS Pattern](https://martinfowler.com/bliki/CQRS.html)
- [DDD Value Objects](https://martinfowler.com/bliki/ValueObject.html)

---

## 👥 Maintainers

- Development Team

---

## 📝 Changelog

### v1.0.0 (2025-10-06)
- Initial implementation with CQRS pattern
- Product CRUD operations
- Advanced search and filtering
- Pagination support
