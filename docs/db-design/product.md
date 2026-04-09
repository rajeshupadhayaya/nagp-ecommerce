# Product Table (SQL)

Contains the essential details for each product.

| Column Name   | Data Type        | Constraints                   | Description                             |
| :------------ | :--------------- | :---------------------------- | :-------------------------------------- |
| `id`          | `INT` / `UUID`   | **Primary Key**               | Unique identifier for the product.      |
| `name`        | `VARCHAR(255)`   | `NOT NULL`                    | Name of the product.                    |
| `description` | `TEXT`           |                               | Detailed description of the product.    |
| `price`       | `DECIMAL(10, 2)` | `NOT NULL`                    | Price of the product.                   |
| `sku`         | `VARCHAR(100)`   | `UNIQUE`, `NOT NULL`          | Stock Keeping Unit.                     |
| `category_id` | `INT` / `UUID`   | `FOREIGN KEY (Category)`      | Links to the product's category.        |
| `created_at`  | `TIMESTAMP`      | `DEFAULT CURRENT_TIMESTAMP`   | Timestamp of product creation.          |
| `updated_at`  | `TIMESTAMP`      | `DEFAULT CURRENT_TIMESTAMP`   | Timestamp of last product update.       |
