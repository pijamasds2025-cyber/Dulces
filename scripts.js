const url = "https://script.google.com/macros/s/AKfycbyoiUfQ45kV75cOkX1srWUiTi49ExeKJKq9LM7L0h1leinWno7CUInJrXAfSDMabwdP/exec";

async function cargarProductos() {
  try {
    const resp = await fetch(url);
    const productos = await resp.json();
    console.log("Productos cargados:", productos);

    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";

    productos.forEach(p => {
      console.log("Producto:", p.nombre, "Imagen URL:", p.imagen_base);

      const card = document.createElement("div");
      card.className = "bg-white p-4 rounded shadow";

      card.innerHTML = `
        <img src="${p.imagen_base || 'https://placehold.co/200x200?text=Sin+Imagen'}"
             alt="${p.nombre}"
             class="w-full h-48 object-cover mb-2 rounded">
        <h2 class="font-bold">${p.nombre}</h2>
        <p>Precio: $${p.precio}</p>
      `;

      contenedor.appendChild(card);
    });
  } catch (err) {
    console.error("Error cargando productos:", err);
  }
}

cargarProductos();
