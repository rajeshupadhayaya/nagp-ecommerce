# User Table (SQL)

Stores information about registered users.

| Column Name   | Data Type      | Constraints                   | Description                       |
| :------------ | :------------- | :---------------------------- | :-------------------------------- |
| `id`          | `INT` / `UUID` | **Primary Key**               | Unique identifier for the user.   |
| `username`    | `VARCHAR(50)`  | `UNIQUE`, `NOT NULL`          | User's chosen username.           |
| `email`       | `VARCHAR(255)` | `UNIQUE`, `NOT NULL`          | User's email address.             |
| `password`    | `VARCHAR(255)` | `NOT NULL`                    | Hashed password for security.     |
| `first_name`  | `VARCHAR(50)`  |                               | User's first name.                |
| `last_name`   | `VARCHAR(50)`  |                               | User's last name.                 |
| `created_at`  | `TIMESTAMP`    | `DEFAULT CURRENT_TIMESTAMP`   | Timestamp of user creation.       |
| `updated_at`  | `TIMESTAMP`    | `DEFAULT CURRENT_TIMESTAMP`   | Timestamp of last user update.    |