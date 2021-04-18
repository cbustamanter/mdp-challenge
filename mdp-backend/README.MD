# Reto técnico MDP

Este es el proyecto backend para el reto técnico de MDP.

Leer **Documentación del API**

## Tecnologías usadas

- MongoDB (Mongoose)
- NodeJS (Express)

## Correr proyecto local

```shell
npm install

npm run start
```

## Documentación del API
- **GET** api/v1/status

- **GET** api/v1/product

- **GET** api/v1/product/:id

- **GET** api/v1/category

- **GET** api/v1/category/:id

- **POST** api/v1/product/add
    ```json5
    {
        "product_cod": String, //must be unique
        "name": String,
        "product_desc": String,
        "category": Category, //must be valid _id
        "price": Number,
        "status": Boolean,
        "created_at": Date, //optional
        "updated_at": Date //optional
    }
    ```
- **POST** api/v1/category/add
    ```json5
    {
        "category_cod:" String, //must be unique
        "category_desc": String,
        "category_name": String,
        "created_at": Date, //optional
        "updated_at": Date //optional
    }
    ```    
- **DELETE** api/v1/product/:id

- **DELETE** api/v1/category/:id

- **PUT** api/v1/product/:id

- **PUT** api/v1/category/:id