const fs = require('fs');
const path = require('path');

class CartManager {
    constructor() {
        this.filePath = path.join(__dirname, '../data/carts.json');
    }

    async leerArchivo() {
        if (!fs.existsSync(this.filePath)) return [];
        const data = await fs.promises.readFile(this.filePath, 'utf-8');
        return JSON.parse(data);
    }

    async escribirArchivo(data) {
        await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 2));
    }

    async crearCarrito() {
        const carritos = await this.leerArchivo();
        const nuevoId = carritos.length > 0 ? carritos[carritos.length - 1].id + 1 : 1;
        const nuevoCarrito = { id: nuevoId, products: [] };
        carritos.push(nuevoCarrito);
        await this.escribirArchivo(carritos);
        return nuevoCarrito;
    }

    async agregarProductoAlCarrito(cid, pid) {
        const carritos = await this.leerArchivo();
        const carrito = carritos.find(c => c.id === cid);
        if (!carrito) return null;

        const productoEnCarrito = carrito.products.find(p => p.product === pid);
        if (productoEnCarrito) {
            productoEnCarrito.quantity += 1;
        } else {
            carrito.products.push({ product: pid, quantity: 1 });
        }

        await this.escribirArchivo(carritos);
        return carrito;
    }
}

module.exports = CartManager;
