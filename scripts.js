let productos = [];
let carrito = [];

const url = "https://script.google.com/macros/s/AKfycbyoiUfQ45kV75cOkX1srWUiTi49ExeKJKq9LM7L0h1leinWno7CUInJrXAfSDMabwdP/exec";

window.addEventListener('DOMContentLoaded', init);

function init() {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      productos = data.map((p, index) => ({
        id: index,
        nombre: p.nombre,
        precio: p.precio,
        tallas: p.tallas ? p.tallas.split(',') : [],
        colores: p.colores ? p.colores.split(',').map((c, idx) => ({
          color: c,
          stock: parseInt(p.stock_colores?.split(',')[idx] || 0),
          imagen: p.imagen_base
        })) : []
      }));
      mostrarProductos(productos);
    })
    .catch(err => console.error("Error cargando productos:", err));
}

function mostrarProductos(lista) {
  const cont = document.getElementById('productos');
  cont.innerHTML = '';
  lista.forEach(p => {
    const div = document.createElement('div');
    div.className = 'producto bg-white rounded shadow p-4 text-center';
    div.innerHTML = `
      <img src="${p.colores[0]?.imagen || p.imagen_base || 'https://via.placeholder.com/200'}" alt="${p.nombre}" class="mx-auto mb-2 rounded w-40 h-40 object-cover">
      <h3 class="font-bold mt-2">${p.nombre}</h3>
      <p class="text-pink-600 font-semibold">$${p.precio}</p>
      <button onclick="agregarAlCarrito(${p.id})" class="mt-2 bg-pink-400 hover:bg-pink-500 text-white px-2 py-1 rounded">Añadir</button>
    `;
    cont.appendChild(div);
  });
}

function agregarAlCarrito(id) {
  const p = productos.find(x => x.id == id);
  carrito.push(p);
  actualizarCarrito();
}

function actualizarCarrito() {
  const cont = document.getElementById('carrito');
  const count = document.getElementById('carrito-count');
  cont.innerHTML = '<h2 class="font-bold">Carrito de Compras</h2>';
  if (carrito.length === 0) {
    cont.innerHTML += '<p>No hay productos aún</p>';
    count.textContent = '0';
    return;
  }
  carrito.forEach(p => {
    const div = document.createElement('div');
    div.textContent = `${p.nombre} - $${p.precio}`;
    cont.appendChild(div);
  });
  count.textContent = carrito.length;
}

document.getElementById('btn-pagar').addEventListener('click', () => {
  document.getElementById('modal-checkout').classList.remove('hidden');
});

function cerrarCheckout() {
  document.getElementById('modal-checkout').classList.add('hidden');
}
