# Category Table (SQL)

For organizing products into categories and subcategories.

| Column Name        | Data Type      | Constraints               | Description                           |
| :----------------- | :------------- | :------------------------ | :------------------------------------ |
| `id`      | `INT` / `UUID` | **Primary Key**           | Unique identifier for the category.   |
| `name`             | `VARCHAR(100)` | `NOT NULL`                | Name of the category.                 |
| `parent_category_id` | `INT` / `UUID` | `FOREIGN KEY (Category)`  | For creating nested categories.       |
