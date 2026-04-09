# Inventory Table (SQL)

Manages stock levels for products.

| Column Name    | Data Type      | Constraints                           | Description                               |
| :------------- | :------------- | :------------------------------------ | :---------------------------------------- |
| `id` | `INT` / `UUID` | **Primary Key**                       | Unique identifier for the inventory record. |
| `product_id`   | `INT` / `UUID` | `FOREIGN KEY (Product)`, `UNIQUE`     | The product this inventory record is for. |
| `quantity`     | `INT`          | `NOT NULL`, `DEFAULT 0`               | Number of items in stock.                 |
| `last_updated` | `TIMESTAMP`    | `DEFAULT CURRENT_TIMESTAMP`           | When the stock level was last updated.    |
