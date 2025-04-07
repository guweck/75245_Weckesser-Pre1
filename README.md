
# Proyecto Final - Backend Coderhouse

## 📦 Descripción

Este proyecto corresponde a la entrega final del curso de Backend de Coderhouse. Se trata de una API RESTful construida con **Node.js**, **Express**, **MongoDB Atlas** y **Mongoose**, que permite la gestión de productos y carritos de compra, incluyendo funcionalidades avanzadas como:

- Paginación, filtrado y ordenamiento de productos.
- Vistas dinámicas con **Handlebars**.
- Gestión completa del carrito.
- WebSockets con **Socket.io** para actualización en tiempo real.
- Persistencia en MongoDB Atlas.
- Validaciones de datos y manejo de errores.
- Simulación de compra con control de stock.

---

## 🚀 Tecnologías Utilizadas

- Node.js + Express
- MongoDB Atlas
- Mongoose
- Express-Handlebars
- Socket.io
- dotenv
- Thunder Client (como alternativa a Postman)

---


## 🛠️ Endpoints Implementados

### Productos `/api/products`

- `GET /`: Lista paginada con filtro, sort y query
- `GET /:pid`: Obtiene un producto por ID
- `POST /`: Crea un nuevo producto (con validaciones)
- `PUT /:pid`: Modifica un producto por ID
- `DELETE /:pid`: Elimina un producto por ID

### Carritos `/api/carts`

- `POST /`: Crea un carrito vacío
- `POST /:cid/products/:pid`: Agrega un producto al carrito
- `GET /:cid`: Obtiene un carrito con productos populados
- `PUT /:cid`: Reemplaza productos en el carrito
- `PUT /:cid/products/:pid`: Actualiza cantidad de producto en carrito
- `DELETE /:cid/products/:pid`: Elimina un producto del carrito
- `DELETE /:cid`: Vacía el carrito
- `POST /:cid/purchase`: Procesa la compra y actualiza stock

---

## 🖥️ Vistas Renderizadas

- `/products`: Listado paginado con enlaces a detalle
- `/products/:pid`: Detalle del producto con botón de agregar al carrito
- `/realtimeproducts`: WebSocket para gestión en tiempo real
- `/carts/:cid`: Vista detallada del carrito con totales

---

## ✅ Validaciones y Manejo de Errores

- Validación de existencia de productos y carritos.
- Validación de propiedades requeridas y tipo de datos.
- Manejo de errores 404 y 500 con mensajes informativos.
- Catch para errores fatales en promesas (evita caída del servidor).

---

## 📈 Diferencias con la primera entrega

- ✅ Conectado correctamente a MongoDB Atlas (`0.0.0.0/0` habilitado).
- ✅ Agregado endpoint POST `/api/products`.
- ✅ Implementado PUT `/api/carts/:cid`.
- ✅ Completados todos los métodos solicitados en carts.routes.js.
- ✅ Agregado endpoint `/api/carts/:cid/purchase`.
- ✅ Todos los endpoints probados manualmente con Thunder Client.
- ✅ README documentado con estructura, endpoints y tecnologías.

---

## 👤 Autor

**Gustavo Weckesser**  
Licenciado en Farmacia, apasionado por la tecnología, buscando reconversión profesional al desarrollo backend con Node.js.  
Proyecto desarrollado con dedicación y esfuerzo personal en tiempo limitado.

---
