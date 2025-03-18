const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/productManager');

const productManager = new ProductManager();

router.get('/', async (req, res) => {
    try {
        const productos = await productManager.obtenerProductos();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const producto = await productManager.obtenerProductoPorId(parseInt(req.params.pid));
        producto ? res.json(producto) : res.status(404).json({ error: 'Producto no encontrado' });
    } catch (error) {
        res.status(500).json({ error: "Error al buscar el producto" });
    }
});

router.post('/', async (req, res) => {
    try {
        const nuevoProducto = await productManager.agregarProducto(req.body);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
