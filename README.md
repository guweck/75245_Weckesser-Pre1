
# Proyecto Backend I - Preentrega 2

**Autor:** Gustavo Weckesser  
**Curso:** Backend I - Coderhouse - Comisión 75245  
**Entrega:** Segunda Preentrega  (Reebtrega)
**Tecnologías:** Node.js, Express, Handlebars, Socket.IO, WebSockets, JavaScript, JSON

---

## 🧠 Descripción

Este proyecto implementa un servidor backend utilizando **Express**, **Handlebars** como motor de plantillas, y **Socket.IO** para funcionalidades en tiempo real.

Se desarrollaron dos vistas:

- `/` → Muestra un listado estático de productos (`home.handlebars`).
- `/realtimeproducts` → Permite crear y eliminar productos con WebSocket, actualizando la vista en tiempo real (`realTimeProducts.handlebars`).

---


## 🧪 Funcionalidades

- ✅ Listado de productos desde archivo `products.json`
- ✅ Agregar producto con formulario en tiempo real
- ✅ Eliminar producto con botón (actualización automática)
- ✅ WebSockets con Socket.IO
- ✅ Uso de `ProductManager.js` para operaciones de persistencia
- ✅ Rutas REST para `/api/products` y `/api/carts`
- ✅ Rutas de vistas separadas en `views.router.js`

---

## 📄 Dependencias principales

- [express](https://www.npmjs.com/package/express)
- [socket.io](https://www.npmjs.com/package/socket.io)
- [express-handlebars](https://www.npmjs.com/package/express-handlebars)
- [nodemon](https://www.npmjs.com/package/nodemon) (solo para desarrollo)

---

## 📌 Observaciones

- El servidor levanta desde `src/app.js`.
- Toda la lógica de productos y carritos está modularizada en `managers/`.
- Los datos se persisten en archivos JSON locales en `src/data/`.

---