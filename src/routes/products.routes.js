const router = require('express').Router();
const Product = require('../dao/models/product.model');

// GET /api/products — Lista todos los productos con paginación, orden y filtro
router.get('/', async (req, res) => {
try {
    const { limit = 10, page = 1, sort, query } = req.query;

    let filtro = {};
    if (query) {
    filtro = {
        $or: [
        { category: query },
        { status: query === 'true' ? true : query === 'false' ? false : undefined }
        ]
    };
    }

    const options = {
    limit: parseInt(limit),
    page: parseInt(page),
    sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : undefined,
    lean: true
    };

    const result = await Product.paginate(filtro, options);

    res.json({
    status: 'success',
    payload: result.docs,
    totalPages: result.totalPages,
    prevPage: result.prevPage,
    nextPage: result.nextPage,
    page: result.page,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevLink: result.hasPrevPage
        ? `/api/products?limit=${limit}&page=${result.prevPage}`
        : null,
    nextLink: result.hasNextPage
        ? `/api/products?limit=${limit}&page=${result.nextPage}`
        : null
    });
} catch (error) {
    console.error("Error en GET /api/products:", error);
    res.status(500).json({ status: 'error', message: error.message });
}
});

// POST /api/products — Agrega un producto con validación
router.post('/', async (req, res) => {
try {
    const { title, description, code, price, status = true, stock, category, thumbnails = [] } = req.body;

    if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).json({ status: 'error', message: 'Campos obligatorios faltantes' });
    }

    const existente = await Product.findOne({ code });
    if (existente) {
    return res.status(400).json({ status: 'error', message: 'El código ya existe' });
    }

    const nuevoProducto = await Product.create({
    title, description, code, price, status, stock, category, thumbnails
    });

    res.status(201).json({ status: 'success', producto: nuevoProducto });
} catch (error) {
    console.error("Error en POST /api/products:", error);
    res.status(500).json({ status: 'error', message: error.message });
}
});

// GET /api/products/:pid — Obtener producto por ID
router.get('/:pid', async (req, res) => {
try {
    const producto = await Product.findById(req.params.pid);
    if (!producto) {
    return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }
    res.json({ status: 'success', producto });
} catch (error) {
    console.error("Error al obtener producto por ID:", error);
    res.status(500).json({ status: 'error', message: error.message });
}
});

// PUT /api/products/:pid — Modificar un producto existente
router.put('/:pid', async (req, res) => {
try {
    const { pid } = req.params;
    const updateData = req.body;

    const producto = await Product.findById(pid);
    if (!producto) {
    return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }

    const camposPermitidos = ['title', 'description', 'code', 'price', 'status', 'stock', 'category', 'thumbnails'];
    for (const campo in updateData) {
    if (camposPermitidos.includes(campo)) {
        producto[campo] = updateData[campo];
    }
    }

    await producto.save();
    res.json({ status: 'success', message: 'Producto actualizado', producto });
} catch (error) {
    console.error("Error al modificar producto:", error);
    res.status(500).json({ status: 'error', message: error.message });
}
});

// DELETE /api/products/:pid — Eliminar un producto
router.delete('/:pid', async (req, res) => {
try {
    const { pid } = req.params;

    const producto = await Product.findByIdAndDelete(pid);
    if (!producto) {
    return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }

    res.json({ status: 'success', message: 'Producto eliminado', productoEliminado: producto });
} catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ status: 'error', message: error.message });
}
});

module.exports = router;
