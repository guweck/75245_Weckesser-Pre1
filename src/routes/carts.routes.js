const express = require('express');
const router = express.Router();
const CartManager = require('../managers/cartManager');
const ProductManager = require('../managers/productManager');

const cartManager = new CartManager();
const productManager = new ProductManager();

router.post('/', async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.crearCarrito();
        res.status(201).json(nuevoCarrito);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el carrito" });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const producto = await productManager.obtenerProductoPorId(parseInt(req.params.pid));
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        const carritoActualizado = await cartManager.agregarProductoAlCarrito(parseInt(req.params.cid), parseInt(req.params.pid));
        res.json(carritoActualizado);
    } catch (error) {
        res.status(500).json({ error: "Error al agregar el producto al carrito" });
    }
});

module.exports = router;
