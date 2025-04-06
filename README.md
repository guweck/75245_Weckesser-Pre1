# 🛍️ Proyecto Final Backend - Reentrega

Este proyecto representa la **reentrega final del curso de Backend (Coderhouse)**, con todas las correcciones y funcionalidades solicitadas por el docente implementadas y probadas.

---

## ✅ Cambios realizados respecto a la primera entrega

1. **Conexión a MongoDB Atlas corregida:**
   - Se agregó la IP `0.0.0.0/0` al acceso de red para permitir la conexión desde cualquier lugar.

2. **Implementación de endpoint POST /api/products:**
   - Se agregó el endpoint para crear nuevos productos.
   - Incluye validación de campos requeridos (`title`, `description`, `code`, `price`, `stock`, `category`).
   - Verifica unicidad del campo `code`.

3. **Implementación de endpoint PUT /api/carts/:cid:**
   - Permite actualizar completamente el arreglo de productos de un carrito.
   - Valida la existencia del carrito y de todos los productos referenciados en el cuerpo de la solicitud.

4. **Implementación de endpoint DELETE /api/carts/:cid/products/:pid:**
   - Permite eliminar un producto específico dentro de un carrito.

5. **Implementación de endpoint DELETE /api/carts/:cid:**
   - Permite vaciar completamente un carrito.

---

## 🧪 Funcionalidades clave implementadas

- CRUD completo de productos con persistencia en MongoDB
- Listado paginado, filtrado y ordenado de productos vía `GET /api/products`
- CRUD completo de carritos, incluyendo populado de productos
- Uso de Mongoose con modelos bien definidos
- Uso de `.populate()` para mostrar detalles completos en el carrito
- Control de errores con try/catch y mensajes claros
- Proyecto modularizado, estructurado en `/src`

---

## 👤 Autor

- Gustavo Weckesser
- Reentrega del Proyecto Final - Curso Backend (Coderhouse)

---

