const fs = require('fs');
const path = require('path');

class ProductManager {
    constructor() {
        this.filePath = path.join(__dirname, '../data/products.json');
    }

    async leerArchivo() {
        if (!fs.existsSync(this.filePath)) return [];
        const data = await fs.promises.readFile(this.filePath, 'utf-8');
        return data ? JSON.parse(data) : [];
    }

    async escribirArchivo(data) {
        await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 2));
    }

    async obtenerProductos() {
        return await this.leerArchivo();
    }

    async obtenerProductoPorId(id) {
        const productos = await this.leerArchivo();
        return productos.find(p => p.id === id);
    }

    async agregarProducto(producto) {
        const productos = await this.leerArchivo();
        const nuevoProducto = { id: Date.now().toString(), ...producto };
        productos.push(nuevoProducto);
        await this.escribirArchivo(productos);
        return nuevoProducto;
    }

    async actualizarProducto(id, datos) {
        const productos = await this.leerArchivo();
        const index = productos.findIndex(p => p.id === id);
        if (index === -1) return null;
        productos[index] = { ...productos[index], ...datos, id: productos[index].id };
        await this.escribirArchivo(productos);
        return productos[index];
    }

    async eliminarProducto(id) {
        let productos = await this.leerArchivo();
        const longitudAntes = productos.length;
        productos = productos.filter(p => p.id !== id);
        await this.escribirArchivo(productos);
        return longitudAntes !== productos.length;
    }
}

module.exports = ProductManager;
