const fs = require('fs');
const path = require('path');

class ProductManager {
    constructor() {
        this.filePath = path.join(__dirname, '../data/products.json');
    }

    async leerArchivo() {
        try {
            if (!fs.existsSync(this.filePath)) return [];
            const data = await fs.promises.readFile(this.filePath, 'utf-8');
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error("Error al leer el archivo de productos:", error);
            return [];
        }
    }

    async escribirArchivo(data) {
        await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 2));
    }

    async agregarProducto(producto) {
        const productos = await this.leerArchivo();

        if (!producto.title || !producto.code || typeof producto.price !== 'number' || typeof producto.stock !== 'number') {
            throw new Error("Propiedades incorrectas. title, code, price (número) y stock (número) son requeridos.");
        }

        if (productos.some(p => p.code === producto.code)) {
            throw new Error("El código del producto ya existe.");
        }

        const nuevoId = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
        const nuevoProducto = { id: nuevoId, ...producto };
        productos.push(nuevoProducto);
        await this.escribirArchivo(productos);
        return nuevoProducto;
    }
}

module.exports = ProductManager;
