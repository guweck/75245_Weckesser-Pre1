const express = require('express');
const app = express();
const PORT = 8080;

// Importar routers correctamente
const routerProductos = require('./src/routes/products.routes');
const routerCarritos = require('./src/routes/carts.routes');

app.use(express.json());

// Definir rutas base correctamente
app.use('/api/products', routerProductos);
app.use('/api/carts', routerCarritos);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
