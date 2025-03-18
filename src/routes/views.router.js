const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/productManager');

const productManager = new ProductManager();

// Ruta para la vista estática de productos
router.get('/', async (req, res) => {
    const productos = await productManager.obtenerProductos();
    res.render('home', { productos });
});

// Ruta para la vista en tiempo real con WebSockets
router.get('/realtimeproducts', async (req, res) => {
    res.render('realTimeProducts');
});

module.exports = router;
