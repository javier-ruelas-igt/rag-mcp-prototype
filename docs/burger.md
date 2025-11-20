# Burger API Documentation (Demo)

A contrived REST API for assembling and ordering custom burgers. Use this for RAG pipeline experimentation.

Base URL
```
https://api.burger.local/v1
```

Authentication
- `x-api-key: YOUR_KEY`
- Free demo key: `demo-key-123` (rate-limited)
- 401 if missing, 429 if exceeded

Core Resources
- Menu (static & dynamic items)
- Order (mutable until checkout)
- Recommendations (rule + ML hybrid stub)
- Feedback (post-order quality signals)

Data Models
Burger
```json
{
  "id": "burger.classic",
  "name": "Classic Forge",
  "description": "Beef patty, cheddar, lettuce, tomato, Forge sauce",
  "basePrice": 7.50,
  "tags": ["beef", "classic"],
  "allergens": ["dairy", "gluten"],
  "nutrition": { "calories": 640, "proteinG": 32, "carbsG": 41, "fatG": 38 }
}
```

Ingredient
```json
{
  "id": "ing.cheddar",
  "type": "cheese",
  "name": "Sharp Cheddar",
  "upcharge": 0.75,
  "allergens": ["dairy"]
}
```

Order
```json
{
  "id": "ord_9f83ac",
  "status": "draft",
  "currency": "USD",
  "items": [
    {
      "itemId": "itm_a12",
      "burgerId": "burger.classic",
      "customizations": {
        "remove": ["tomato"],
        "add": ["ing.jalapeno"],
        "cookLevel": "medium"
      },
      "unitPrice": 8.25
    }
  ],
  "subtotal": 8.25,
  "tax": 0.74,
  "total": 8.99,
  "createdAt": "2025-11-20T10:01:12Z"
}
```

Endpoints

GET /menu
Query params:
- `tag=vegan|beef|spicy`
- `maxCalories=INT`
- `include=nutrition,ingredients`
Response: 200 → array of burgers

GET /menu/{burgerId}
Response: 200 burger, 404 if missing

GET /ingredients
Response: flat ingredient list

POST /order
Body:
```json
{ "currency": "USD" }
```
Response: 201 draft order

GET /order/{orderId}
Response: 200 order or 404

POST /order/{orderId}/items
Body:
```json
{
  "burgerId": "burger.classic",
  "customizations": {
    "add": ["ing.jalapeno"],
    "remove": ["tomato"],
    "cookLevel": "medium-rare"
  }
}
```
Rules:
- Max 25 items per order
- Cook levels: rare | medium-rare | medium | medium-well | well-done
Response: 201 updated order

PATCH /order/{orderId}
Allowed fields: status (only draft → locked before checkout)  
Body:
```json
{ "status": "locked" }
```

DELETE /order/{orderId}/items/{itemId}
Removes line item. 204 no content.

POST /order/{orderId}/checkout
Valid only if status=locked and items>0.
Calculates final pricing, flips status → completed.
Response: 200:
```json
{ "orderId": "ord_9f83ac", "status": "completed", "estimatedReadyMins": 14 }
```

GET /recommendations
Query params:
- `tasteProfile=spicy|light|protein|lowcarb`
- `limit=INT (default 3)`
Response: curated burger list

POST /feedback
Body:
```json
{
  "orderId": "ord_9f83ac",
  "rating": 4,
  "comments": "Great heat balance.",
  "issues": []
}
```
Rating 1–5. Response: 202 accepted.

Errors
- 400 BAD_REQUEST (invalid ingredient id, malformed JSON)
- 401 UNAUTHORIZED (missing api key)
- 404 NOT_FOUND (resource)
- 409 CONFLICT (checkout on already completed order)
- 422 UNPROCESSABLE_ENTITY (cookLevel invalid)
- 429 RATE_LIMIT (demo key exceeded)
- 500 SERVER_ERROR (generic)

Price Calculation
```
item.unitPrice = burger.basePrice
               + Σ(addIngredient.upcharge)
               - Σ(removeIngredient.credit? default 0)
Tax = subtotal * 0.09 (demo fixed)
```

Filtering Examples
- Low calorie under 500:
  GET /menu?maxCalories=500
- High protein & spicy:
  GET /menu?tag=spicy&include=nutrition

Recommendation Example
```
GET /recommendations?tasteProfile=spicy&limit=2
→ [
  { "id": "burger.firestorm", "score": 0.91 },
  { "id": "burger.jalapeno.jack", "score": 0.83 }
]
```

Typical Workflow
1. Create draft order: POST /order
2. Add items: POST /order/{id}/items
3. Lock draft: PATCH /order/{id} status=locked
4. Checkout: POST /order/{id}/checkout
5. Feedback (optional): POST /feedback

FAQ (Good for RAG)
Q: How do I customize a burger?  
A: Include an `add` / `remove` list in POST /order/{id}/items body.

Q: Can I change an order after checkout?  
A: No. Only draft orders can mutate.

Q: How do I get nutrition info?  
A: Use GET /menu?include=nutrition or GET /menu/{id}.

Q: What causes 409 at checkout?  
A: Order already completed or empty items list.

Q: How to reduce calories?  
A: Remove cheese (`ing.cheddar`), add lettuce (`ing.lettuce`), filter with `maxCalories`.

Changelog
- 2025-11-20: Initial prototype spec.