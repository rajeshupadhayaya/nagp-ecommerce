# Order Table (SQL)

Stores information about customer orders.

| Column Name      | Data Type        | Constraints                 | Description                               |
| :--------------- | :--------------- | :-------------------------- | :---------------------------------------- |
| `id`       | `INT` / `UUID`   | **Primary Key**             | Unique identifier for the order.          |
| `user_id`        | `INT` / `UUID`   | `FOREIGN KEY (User)`        | The user who placed the order.            |
| `order_date`     | `TIMESTAMP`      | `DEFAULT CURRENT_TIMESTAMP` | Date and time the order was placed.       |
| `total_amount`   | `DECIMAL(10, 2)` | `NOT NULL`                  | Total cost of the order.                  |
| `status`         | `VARCHAR(50)`    | `NOT NULL`                  | e.g., 'pending', 'shipped', 'delivered'.  |
| `shipping_address_id` | `INT` / `UUID`   | `FOREIGN KEY (UserAddress)` | The shipping address for the order.       |
| `billing_address_id`  | `INT` / `UUID`   | `FOREIGN KEY (UserAddress)` | The billing address for the order.        |
