# Shipping Collection (NoSQL)

Stores shipping details and tracking information related to an order.

**Example Document:**
```json
{
  "_id": "shipping_for_order_xyz",
  "order_id": "order_xyz",
  "carrier": "UPS",
  "tracking_number": "1Z999AA10123456784",
  "status_history": [
    { "status": "shipped", "timestamp": "2026-04-01T18:00:00Z" },
    { "status": "in_transit", "timestamp": "2026-04-02T09:00:00Z" },
    { "status": "delivered", "timestamp": "2026-04-04T13:00:00Z" }
  ],
  "estimated_delivery": "2026-04-05"
}
```
