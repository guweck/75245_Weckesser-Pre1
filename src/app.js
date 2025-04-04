const express = require('express');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const path = require('path');
const handlebars = require('express-handlebars'); // solo una vez

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { dbName: 'coderhouse' })
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.log(err));

const app = express();
const server = app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Configuración con helpers incluida
app.engine('handlebars', handlebars.engine({
  helpers: {
    multiply: (a, b) => a * b,
    totalCarrito: (productos) => {
      return productos.reduce((total, item) => {
        return total + item.quantity * item.product.price;
      }, 0);
    }
  }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Importar rutas
const productsRouter = require('./routes/products.routes');
const cartsRouter = require('./routes/carts.routes');
const viewsRouter = require('./routes/views.router');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// WebSocket básico
io.on('connection', socket => {
    console.log('Cliente conectado');
});
