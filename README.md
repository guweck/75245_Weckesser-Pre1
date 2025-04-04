# 🛒 Proyecto Final BackendI Coderhouse

Este proyecto es la entrega final del curso de **Backend I** de **Gustavo Weckesser - comisión 75245**. Se trata de un servidor completo de gestión de productos y carritos de compra con vistas dinámicas, persistencia en MongoDB Atlas, WebSockets, SweetAlert2 y Handlebars.

---

## 🚀 Tecnologías utilizadas

- **Node.js**
- **Express.js**
- **MongoDB Atlas**
- **Mongoose**
- **Socket.IO**
- **Express-Handlebars**
- **SweetAlert2**
- **dotenv**
- **Nodemon**



### 🔹 Productos

- `GET /products` → Listado paginado, ordenado y filtrado de productos
- `GET /products/:pid` → Vista individual de producto con botón de agregar al carrito

### 🔹 Carritos

- `POST /api/carts` → Crear nuevo carrito
- `POST /api/carts/:cid/products/:pid` → Agregar producto al carrito
- `GET /carts/:cid` → Vista del carrito con productos populados y totales

### 🔹 Websockets

- `GET /realtimeproducts` → Vista con productos actualizados en tiempo real

---


## 🧪 Pruebas funcionales

- Productos: paginación, ordenamiento y visualización
- Detalle de producto: funcional, con botón de agregar al carrito
- Carrito: agregado correcto, visualización con totales
- WebSocket: actualiza vista en tiempo real
- MongoDB Atlas: persiste información correctamente

---

## 💬 Autor

- Gustavo Weckesser
- Coderhouse | Curso Backend | Comisión 75245

---

## 🏁 Estado del proyecto

✅ Completado y funcional verificado.
