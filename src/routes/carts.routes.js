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

module.exports = router;
