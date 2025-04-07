const router = require('express').Router();
const Cart = require('../dao/models/cart.model');
const Product = require('../dao/models/product.model');

// POST /api/carts → crear un carrito nuevo vacío
router.post('/', async (req, res) => {
  try {
    const nuevoCarrito = await Cart.create({ products: [] });
    res.status(201).json({ status: 'success', cartId: nuevoCarrito._id });
  } catch (error) {
    console.error("Error al crear carrito:", error);
    res.status(500).json({ status: 'error', message: 'No se pudo crear el carrito' });
  }
});

// POST /api/carts/:cid/products/:pid → agregar producto al carrito
router.post('/:cid/products/:pid', async (req, res) => {
  try {
    const carrito = await Cart.findById(req.params.cid);
    if (!carrito) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    const producto = await Product.findById(req.params.pid);
    if (!producto) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });

    const index = carrito.products.findIndex(p => p.product.equals(producto._id));

    if (index !== -1) {
      carrito.products[index].quantity += 1;
    } else {
      carrito.products.push({ product: producto._id, quantity: 1 });
    }

    await carrito.save();
    res.json({ status: 'success', message: 'Producto agregado al carrito' });
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    res.status(500).json({ status: 'error', message: 'Error interno al agregar el producto' });
  }
});

// GET /api/carts/:cid → mostrar carrito con productos populados
router.get('/:cid', async (req, res) => {
  try {
    const carrito = await Cart.findById(req.params.cid).populate('products.product').lean();
    if (!carrito) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    res.json({ status: 'success', cart: carrito });
  } catch (error) {
    console.error("Error al obtener carrito:", error);
    res.status(500).json({ status: 'error', message: 'Error interno' });
  }
});
// PUT /api/carts/:cid (reemplazar el arreglo de productos)
router.put('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const nuevosProductos = req.body;

    if (!Array.isArray(nuevosProductos)) {
      return res.status(400).json({ status: 'error', message: 'El cuerpo debe ser un array de productos' });
    }

    const carrito = await Cart.findById(cid);
    if (!carrito) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    // Validar que todos los productos existan
    for (const item of nuevosProductos) {
      const existeProducto = await Product.findById(item.product);
      if (!existeProducto) {
        return res.status(400).json({ status: 'error', message: `Producto no encontrado: ${item.product}` });
      }
    }

    // Reemplazar el array completo
    carrito.products = nuevosProductos;
    await carrito.save();

    res.json({ status: 'success', message: 'Carrito actualizado con nuevos productos', cart: carrito });
  } catch (error) {
    console.error("Error en PUT /api/carts/:cid:", error);
    res.status(500).json({ status: 'error', message: 'Error interno al actualizar carrito' });
  }
});
// DELETE /api/carts/:cid/products/:pid → eliminar un producto del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const carrito = await Cart.findById(cid);
    if (!carrito) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    const index = carrito.products.findIndex(p => p.product.toString() === pid);
    if (index === -1) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado en el carrito' });
    }

    carrito.products.splice(index, 1); // eliminar producto
    await carrito.save();

    res.json({ status: 'success', message: 'Producto eliminado del carrito' });
  } catch (error) {
    console.error("Error al eliminar producto del carrito:", error);
    res.status(500).json({ status: 'error', message: 'Error interno' });
  }
});
// DELETE /api/carts/:cid → vaciar el carrito completo
router.delete('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;

    const carrito = await Cart.findById(cid);
    if (!carrito) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    carrito.products = []; // vaciar
    await carrito.save();

    res.json({ status: 'success', message: 'Carrito vaciado correctamente' });
  } catch (error) {
    console.error("Error al vaciar carrito:", error);
    res.status(500).json({ status: 'error', message: 'Error interno al vaciar el carrito' });
  }
});
// POST /api/carts/:cid/purchase → proceso de compra
router.post('/:cid/purchase', async (req, res) => {
  try {
    const carrito = await Cart.findById(req.params.cid).populate('products.product');
    if (!carrito) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    const productosComprados = [];
    const productosSinStock = [];
    let total = 0;

    for (const item of carrito.products) {
      const producto = item.product;
      const cantidad = item.quantity;

      if (producto.stock >= cantidad) {
        // Descuenta el stock
        producto.stock -= cantidad;
        await producto.save();

        // Agrega al total y a la lista de compra
        productosComprados.push({ product: producto._id, title: producto.title, quantity: cantidad, price: producto.price });
        total += cantidad * producto.price;
      } else {
        // Producto no tiene stock suficiente
        productosSinStock.push({ product: producto._id, title: producto.title });
      }
    }

    // Limpiar carrito solo de productos procesados
    carrito.products = carrito.products.filter(item =>
      productosSinStock.some(p => p.product.toString() === item.product._id.toString())
    );
    await carrito.save();

    res.json({
      status: 'success',
      message: 'Compra procesada',
      total,
      productosComprados,
      productosSinStock
    });
  } catch (error) {
    console.error("Error en compra del carrito:", error);
    res.status(500).json({ status: 'error', message: 'Error al procesar la compra' });
  }
});
// PUT /api/carts/:cid/products/:pid → actualizar cantidad de un producto en el carrito
router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if (typeof quantity !== 'number' || quantity < 1) {
      return res.status(400).json({ status: 'error', message: 'Cantidad inválida' });
    }

    const carrito = await Cart.findById(cid);
    if (!carrito) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    const producto = await Product.findById(pid);
    if (!producto) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });

    const index = carrito.products.findIndex(p => p.product.toString() === pid);
    if (index === -1) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado en el carrito' });
    }

    carrito.products[index].quantity = quantity;
    await carrito.save();

    res.json({ status: 'success', message: 'Cantidad actualizada correctamente', cart: carrito });
  } catch (error) {
    console.error("Error al actualizar cantidad del producto:", error);
    res.status(500).json({
      status: 'error',
      message: 'Error interno al actualizar cantidad',
      detalle: error.message
    });
  }
  
});

module.exports = router;
