const express = require('express');
const app = express();
const PORT = 8080;

// Importar los routers
const routerProductos = require('./routes/products.routes');
const routerCarritos = require('./routes/carts.routes');

app.use(express.json());

// Definir rutas base
app.use('/api/products', routerProductos);
app.use('/api/carts', routerCarritos);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
