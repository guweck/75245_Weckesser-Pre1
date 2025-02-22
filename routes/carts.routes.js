const express = require('express');
const router = express.Router();
const CartManager = require('../managers/cartManager');

const cartManager = new CartManager();

// Crear nuevo carrito
router.post('/', async (req, res) => {
    const nuevoCarrito = await cartManager.crearCarrito();
    res.status(201).json(nuevoCarrito);
});

// Obtener carrito por ID
router.get('/:cid', async (req, res) => {
    const carrito = await cartManager.obtenerCarritoPorId(req.params.cid);
    carrito ? res.json(carrito) : res.status(404).json({ error: 'Carrito no encontrado' });
});

// Agregar producto a un carrito
router.post('/:cid/product/:pid', async (req, res) => {
    const resultado = await cartManager.agregarProductoAlCarrito(req.params.cid, req.params.pid);
    resultado ? res.json(resultado) : res.status(404).json({ error: 'Error al agregar producto' });
});

module.exports = router;
