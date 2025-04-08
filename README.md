
# 🛒 Proyecto Backend | Coderhouse - Reentrega Final

Este proyecto corresponde a la **Reentrega de la Primera Entrega del Proyecto Final** del curso de Backend en Coderhouse. El backend fue desarrollado utilizando Node.js, Express y MongoDB (a través de Mongoose), y cumple con los requisitos establecidos por el docente, incluyendo los endpoints detallados en la colección de Postman proporcionada.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- MongoDB Atlas + Mongoose
- Nodemon (modo desarrollo)
- Handlebars (motor de vistas)
- Postman (para pruebas de endpoints)
- Thunder Client (durante el desarrollo)

---

## ✅ Endpoints implementados y probados exitosamente

### 📦 `/api/products`

- `GET /api/products` — Listado de productos con paginación, orden y filtros.
- `GET /api/products/:pid` — Obtener un producto por su ID.
- `POST /api/products` — Crear un nuevo producto (validando campos obligatorios y unicidad del código).
- `PUT /api/products/:pid` — Actualizar datos de un producto existente.
- `DELETE /api/products/:pid` — Eliminar un producto existente.

### 🛒 `/api/carts`

- `POST /api/carts` — Crear un nuevo carrito.
- `GET /api/carts/:cid` — Obtener un carrito por su ID, con los productos populados.
- `POST /api/carts/:cid/products/:pid` — Agregar un producto a un carrito.
- `PUT /api/carts/:cid` — Reemplazar todo el contenido del carrito con un nuevo array de productos.
- `PUT /api/carts/:cid/products/:pid` — Actualizar la cantidad de un producto en el carrito.
- `DELETE /api/carts/:cid/products/:pid` — Eliminar un producto específico del carrito.
- `DELETE /api/carts/:cid` — Vaciar completamente un carrito.
- `POST /api/carts/:cid/purchase` — Procesar la compra, descontando stock y dejando en el carrito solo los productos que no tenían stock suficiente.

> ⚠️ **Nota sobre Postman**: En la colección de Postman entregada por el docente, el endpoint `DELETE /api/carts/:cid/product/:pid` aparece con error tipográfico (`product` en lugar de `products`). El endpoint correcto y funcional es `DELETE /api/carts/:cid/products/:pid`.

---

## 🔐 Seguridad

IMPORTANTE: El archivo `.env` fue incluido intencionalmente para esta reentrega, para permitir al docente acceder directamente a la base de datos remota en MongoDB Atlas. Tras la evaluación, será eliminado del repositorio y su contenido invalidado por seguridad.

---

## 🧪 Validación completa

Todos los endpoints mencionados fueron probados con éxito, inicialmente mediante requests individuales con Thunder Client desde VSC hasta haber ajustaco correctamente el código y finalmente mediante Postman, utilizando la colección oficial del docente, probanto la totalidad de endpointe de products y de carts. Se validó:
- Que no se produzcan caídas del servidor ante errores o entradas inválidas.
- Que se cumpla la lógica de negocio esperada (e.g. control de stock, unicidad, etc).
- Que los datos persistan correctamente en MongoDB.

---

## 📝 Comentarios sobre la reentrega

Se corrigieron los siguientes puntos desde la entrega inicial:
1. Se habilitó el acceso público a MongoDB Atlas (`0.0.0.0/0`).
2. Se agregó el endpoint `POST /api/products` con validaciones.
3. Se implementó `PUT /api/carts/:cid` para reemplazar productos del carrito.
4. Se agregaron:
   - `DELETE /api/carts/:cid/products/:pid`
   - `DELETE /api/carts/:cid`
   - `POST /api/carts/:cid/purchase`
   - `PUT /api/carts/:cid/products/:pid` (actualiza cantidad)
5. Se completó el CRUD de productos con:
   - `PUT /api/products/:pid`
   - `DELETE /api/products/:pid`

---
