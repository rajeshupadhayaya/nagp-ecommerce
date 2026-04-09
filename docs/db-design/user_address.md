# User Address Table (SQL)

Stores shipping and billing addresses for users. A user can have multiple addresses.

| Column Name     | Data Type      | Constraints               | Description                               |
| :-------------- | :------------- | :------------------------ | :---------------------------------------- |
| `id`            | `INT` / `UUID` | **Primary Key**           | Unique identifier for the address.        |
| `user_id`       | `INT` / `UUID` | `FOREIGN KEY (User)`      | The user this address belongs to.         |
| `address_type`  | `VARCHAR(50)`  | `NOT NULL`                | e.g., 'shipping', 'billing'.              |
| `address_line1` | `VARCHAR(255)` | `NOT NULL`                | Main address line.                        |
| `address_line2` | `VARCHAR(255)` |                           | Optional second address line.             |
| `city`          | `VARCHAR(100)` | `NOT NULL`                | City.                                     |
| `state`         | `VARCHAR(100)` | `NOT NULL`                | State or province.                        |
| `postal_code`   | `VARCHAR(20)`  | `NOT NULL`                | Postal or ZIP code.                       |
| `country`       | `VARCHAR(100)` | `NOT NULL`                | Country.                                  |
| `is_default`    | `BOOLEAN`      | `DEFAULT FALSE`           | Whether this is the user's default address. |
