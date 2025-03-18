const express = require('express');
const { Server } = require('socket.io');
const handlebars = require('express-handlebars');
const path = require('path');
const http = require('http');
const ProductManager = require('./managers/productManager');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const productManager = new ProductManager();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configurar Handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Importar routers
const routerProductos = require('./routes/products.routes');
const routerCarritos = require('./routes/carts.routes');
const viewsRouter = require('./routes/views.router');

app.use('/api/products', routerProductos);
app.use('/api/carts', routerCarritos);
app.use('/', viewsRouter);

// WebSockets
io.on('connection', async (socket) => {
    console.log('Nuevo cliente conectado');

    // Enviar productos al cliente cuando se conecta
    socket.emit('productos', await productManager.obtenerProductos());

    // Escuchar evento de creación de productos
    socket.on('nuevoProducto', async (producto) => {
        const productoCreado = await productManager.agregarProducto(producto);
        io.emit('productos', await productManager.obtenerProductos());
    });

    // Escuchar evento de eliminación de productos
    socket.on('eliminarProducto', async (id) => {
        await productManager.eliminarProducto(id);
        io.emit('productos', await productManager.obtenerProductos());
    });
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
