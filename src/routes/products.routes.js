const router = require('express').Router();
const Product = require('../dao/models/product.model');

// GET /api/products con paginación, filtro y orden
router.get('/', async (req, res) => {
try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const filtro = query
    ? {
        $or: [
            { category: query },
            { status: query === 'true' || query === 'false' ? query === 'true' : undefined }
        ]
        }
    : {};

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

module.exports = router;
