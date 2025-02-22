const fs = require('fs');
const path = require('path');

class CartManager {
    constructor() {
        // Definir la ruta del archivo donde se almacenarán los carritos
        this.filePath = path.join(__dirname, '../data/carts.json');
    }

    // Método para leer el archivo JSON
    async leerArchivo() {
        try {
            if (!fs.existsSync(this.filePath)) return [];
            const data = await fs.promises.readFile(this.filePath, 'utf-8');
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error("Error al leer el archivo de carritos:", error);
            return [];
        }
    }

    // Método para escribir en el archivo JSON
    async escribirArchivo(data) {
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error("Error al escribir en el archivo de carritos:", error);
        }
    }

    // Método para crear un nuevo carrito
    async crearCarrito() {
        const carritos = await this.leerArchivo();
        const nuevoCarrito = { id: Date.now().toString(), products: [] };
        carritos.push(nuevoCarrito);
        await this.escribirArchivo(carritos);
        return nuevoCarrito;
    }

    // Método para obtener un carrito por ID
    async obtenerCarritoPorId(id) {
        const carritos = await this.leerArchivo();
        return carritos.find(c => c.id === id);
    }

    // Método para agregar un producto a un carrito
    async agregarProductoAlCarrito(cid, pid) {
        const carritos = await this.leerArchivo();
        const carrito = carritos.find(c => c.id === cid);

        if (!carrito) {
            return { error: "Carrito no encontrado" };
        }

        // Buscar si el producto ya está en el carrito
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
