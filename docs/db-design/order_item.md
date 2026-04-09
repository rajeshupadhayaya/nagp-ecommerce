# OrderItem Table (SQL)

A junction table to associate products with orders.

| Column Name       | Data Type        | Constraints               | Description                               |
| :---------------- | :--------------- | :------------------------ | :---------------------------------------- |
| `id`   | `INT` / `UUID`   | **Primary Key**           | Unique identifier for the order item.     |
| `order_id`        | `INT` / `UUID`   | `FOREIGN KEY (Order)`     | The order this item belongs to.           |
| `product_id`      | `INT` / `UUID`   | `FOREIGN KEY (Product)`   | The product that was ordered.             |
| `quantity`        | `INT`            | `NOT NULL`                | Number of units of the product ordered.   |
| `price_at_purchase` | `DECIMAL(10, 2)` | `NOT NULL`                | The price of the product when ordered.    |
