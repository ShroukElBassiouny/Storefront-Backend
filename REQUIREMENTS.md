## API Endpoints

## Data Shapes

#### Product

- id
- name
- price
- category

products(id: serial PRIMARY KEY, name: VARCHAR, price: VARCHAR, category: VARCHAR)

#### User

- id
- firstName
- lastName
- password

users(id: serial PRIMARY KEY, firstName: VARCHAR, lastName: VARCHAR, password: VARCHAR)

#### Orders

- id
- user_id
- status of order (active or complete)

orders(id: serial PRIMARY KEY, status: VARCHAR(15), user_id: bigint REFERENCES users(id))

#### OrderProducts

- id
- product_id of each product in the order
- order_id
- quantity of each product in the order

order_products(id: SERIAL PRIMARY KEY, quantity: integer, order_id: bigint REFERENCES orders(id), product_id: bigint REFERENCES products(id)
)

### Products

- Create Product [token required]

  - `Method:` POST

  - `URL:` {{URL}}/api/store/products

  - **_Example :_**

```js
     {
       "product": {
         "name": "phone",
         "price": 300,
         "category": "electronics"
       }
     }
```

- Index: List all products [token NOT required]

  - `Method:` GET

  - `URL:` {{URL}}/api/store/products

- Show: Show a product [token NOT required]

  - `Method:` GET

  - `URL:` {{URL}}/api/store/products/{id}

- Top 5 most popular products [token NOT required]

  - `Method:` GET

  - `URL:` {{URL}}/api/store/products?category=lemon

### Users

- Create User [token required]

  - `Method:` POST

  - `URL:` {{URL}}/api/store/users

  - **_Example  :_**

  ```js
      {
      "user": {
        "firstName": "shrey",
        "lastName": "nour",
        "password": "passsword"
      }
    }
  ```

- Login

  - `Method:` POST

  - `URL:` {{URL}}/api/store/login



- Index: Show a list of Users [ token required ]

  - `Method:` GET

  - `URL:` {{URL}}/api/store/users

- Show single product [ token required ]

  - `Method:` GET

  - `URL:` {{URL}}/api/store/users/{id}

#### Orders

- Create New Order [ token required ]

  - `Method:` POST
  - `URL:` {{URL}}/api/store/orders/{userId}

  - **_Example  :_**

  ```js
      {
        "order": {
          "orderItems": [
            {
              "productId": "string",
              "quantity": 0
            }
          ]
        }
    }
  ```

- Get all orders [token required]

  - `Method:` GET

  - `URL:` {localhost:}/api/store/orders/{userId}


- Get Single Order for a customer (args: user id)[token required]

  - `Method:` GET

  - `URL:` {localhost:}/api/store/orders/{userId}/{orderId}

- Update Order (args: user id)[token required]

  - `Method:` PUT

  - `URL:` {localhost:}/api/store/orders/{userId}/{orderId}
