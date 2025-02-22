const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/productManager');

const productManager = new ProductManager();

// Obtener todos los productos
router.get('/', async (req, res) => {
    const productos = await productManager.obtenerProductos();
    res.json(productos);
});

// Obtener producto por ID
router.get('/:pid', async (req, res) => {
    const producto = await productManager.obtenerProductoPorId(req.params.pid);
    producto ? res.json(producto) : res.status(404).json({ error: 'Producto no encontrado' });
});

// Agregar nuevo producto
router.post('/', async (req, res) => {
    const nuevoProducto = await productManager.agregarProducto(req.body);
    res.status(201).json(nuevoProducto);
});

// Actualizar producto
router.put('/:pid', async (req, res) => {
    const productoActualizado = await productManager.actualizarProducto(req.params.pid, req.body);
    productoActualizado ? res.json(productoActualizado) : res.status(404).json({ error: 'Producto no encontrado' });
});

// Eliminar producto
router.delete('/:pid', async (req, res) => {
    const resultado = await productManager.eliminarProducto(req.params.pid);
    resultado ? res.json({ mensaje: 'Producto eliminado' }) : res.status(404).json({ error: 'Producto no encontrado' });
});

module.exports = router;
