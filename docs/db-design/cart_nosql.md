# Cart Collection (NoSQL)

Stores the contents of a user's shopping cart. This data is often temporary and user-specific.

**Example Document:**
```json
{
  "_id": "cart_for_user_456",
  "user_id": "user_456",
  "items": [
    {
      "product_id": "product_123",
      "name": "Classic White T-Shirt",
      "quantity": 2,
      "price": 25.00,
      "image": "http://example.com/image1.jpg"
    },
    {
      "product_id": "product_789",
      "name": "Blue Denim Jeans",
      "quantity": 1,
      "price": 70.00,
      "image": "http://example.com/jeans.jpg"
    }
  ],
  "last_updated": "2026-04-08T10:00:00Z"
}
```
