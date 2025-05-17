# 📦 Parcial Práctico – MISW4403 – Diseño y Construcción de APIs

Este proyecto corresponde al **parcial práctico** de la materia **MISW4403 – Diseño y Construcción de APIs** de la Maestría en Ingeniería de Software – Universidad de los Andes.

Se implementa una API REST en **NestJS** para gestionar **restaurantes** y **platos**, así como la asociación entre ellos, cumpliendo el 100% de los requisitos del enunciado.

---

## ✅ Requisitos oficiales del enunciado

### 🟩 1. Persistencia (6%)
- Entidades `Restaurant` y `Dish` completas.
- Relación `ManyToMany` entre ambas (`restaurant.dishes`, `dish.restaurants`).

### 🟩 2. Lógica de negocio (43%)
- CRUD completo para `RestaurantService` y `DishService`.
- Validaciones:
  - `cuisine` válida (`Italiana`, `Japonesa`, etc.).
  - `price` positivo.
  - `category` válida (`entrada`, `plato fuerte`, etc.).
- Asociación:
  - `addDishToRestaurant`
  - `findDishesFromRestaurant`
  - `findDishFromRestaurant`
  - `updateDishesFromRestaurant`
  - `deleteDishFromRestaurant`
- Manejo de errores con `NotFoundException`.
- Pruebas unitarias funcionales mínimas.

### 🟩 3. API REST (24%)
- Controladores y rutas REST:
  - `/restaurant`
  - `/dish`
  - `/restaurants/:restaurantId/dishes/:dishId`

### 🟩 4. Pruebas Postman (27%)
- Colecciones:
  - `restaurant.postman_collection.json`
  - `dish.postman_collection.json`
  - `restaurant-dish.postman_collection.json`
- Casos válidos e inválidos cubiertos.

### 🟩 5. Entrega final
- Carpeta `collections/` incluida.
- Release `v1.0.0` en GitHub.
- Proyecto entregado como `.zip` en Coursera.

---

## 🧰 Tecnologías utilizadas

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [SQLite](https://www.sqlite.org/)
- [Postman](https://www.postman.com/)
- [Jest](https://jestjs.io/)

---

## 🚀 Cómo ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/restaurant-api.git
cd restaurant-api
```

### 2. Instalar las dependencias

```bash
npm install
```

### 3. Ejecutar el servidor en modo desarrollo

```bash
npm run start:dev
```

El servidor estará disponible en:  
[http://localhost:3000](http://localhost:3000)

---

## 🧪 Cómo ejecutar los tests

### 1. Pruebas unitarias (Jest)

Ejecuta todos los tests unitarios con:

```bash
npm run test
```

Esto incluye pruebas funcionales para los servicios principales (`DishService`, `RestaurantDishService`, etc.).

### 2. Pruebas de API (Postman)

- Abre Postman.
- Importa las colecciones desde la carpeta `collections/`.
- Ejecuta los requests para probar todos los endpoints y casos válidos/inválidos.

---

## 📚 Ejemplos de uso de la API

### Crear un restaurante

```http
POST /restaurant
Content-Type: application/json

{
  "name": "La Pizzería",
  "address": "Calle 123",
  "cuisine": "Italiana",
  "website": "https://lapizzeria.com"
}
```

### Crear un plato

```http
POST /dish
Content-Type: application/json

{
  "name": "Pizza Margarita",
  "description": "Pizza clásica con tomate y albahaca",
  "price": 25000,
  "category": "plato fuerte"
}
```

### Asociar un plato a un restaurante

```http
POST /restaurants/1/dishes/1
```

---

## 📁 Estructura relevante del proyecto

- `src/restaurant/` – Módulo de restaurantes
- `src/dish/` – Módulo de platos
- `src/restaurant-dish/` – Módulo de asociación restaurante-plato
- `collections/` – Colecciones de Postman para pruebas

---

## 👤 Autor

- **Nombre:** [Erika Margarita Forero Sossa]
- **Correo:** [e.foreros@uniandes.edu.co]
- **Materia:** MISW4403 – Diseño y Construcción de APIs


