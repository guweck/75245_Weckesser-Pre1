const socket = io();

socket.on('productos', (productos) => {
    const lista = document.getElementById('listaProductos');
    lista.innerHTML = "";
    productos.forEach(p => {
        lista.innerHTML += `<li>${p.title} - ${p.price} <button onclick="eliminar(${p.id})">Eliminar</button></li>`;
    });
});

document.getElementById('formProducto').addEventListener('submit', (e) => {
    e.preventDefault();
    const producto = {
        title: document.getElementById('title').value,
        code: document.getElementById('code').value,
        price: Number(document.getElementById('price').value),
        stock: Number(document.getElementById('stock').value)
    };
    socket.emit('nuevoProducto', producto);
});

function eliminar(id) {
    socket.emit('eliminarProducto', id);
}
