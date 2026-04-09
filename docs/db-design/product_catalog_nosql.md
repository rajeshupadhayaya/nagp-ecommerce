# Product Catalog Collection (NoSQL)

A denormalized and rich representation of products, optimized for fast reads when displaying product listings and details.

**Example Document:**
```json
{
  "_id": "product_id_123",
  "name": "Classic White T-Shirt",
  "description": "A comfortable and stylish 100% cotton t-shirt.",
  "price": 25.00,
  "sku": "TSH-WHT-M",
  "categories": ["T-Shirts", "Men's Apparel"],
  "images": [
    "http://example.com/image1.jpg",
    "http://example.com/image2.jpg"
  ],
  "attributes": {
    "color": "White",
    "size": "M",
    "material": "Cotton"
  },
  "average_rating": 4.5,
  "review_count": 150
}
```
