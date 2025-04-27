    document.addEventListener('DOMContentLoaded', () => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
    function agregarProducto(e) {
      const card = e.target.closest('.product-card');
      const titulo = card.querySelector('.product-title').innerText;
      const precioTexto = card.querySelector('.product-price').innerText;
      const precio = parseInt(precioTexto.replace('₡', '').replace('.', '').replace(',', ''));
      const imagen = card.querySelector('img').src;
  
      const producto = { titulo, precio, imagen, cantidad: 1 };
  
      const index = carrito.findIndex(p => p.titulo === producto.titulo);
      if (index >= 0) {
        carrito[index].cantidad += 1;
      } else {
        carrito.push(producto);
      }
  
      localStorage.setItem('carrito', JSON.stringify(carrito));
      mostrarMensaje();
      actualizarContador();

        // Mostrar mensaje con el nombre del producto
  const mensaje = document.getElementById('mensajeExito');
  mensaje.innerHTML = `“${titulo}” agregado a la bolsa `;
  mensaje.style.display = 'block';

  // Ocultar mensaje después de 2.5 segundos
  setTimeout(() => {
    mensaje.style.display = 'none';
  }, 2500);
}


    function actualizarContador() {
      const contador = document.getElementById('contadorCarrito');
      const totalProductos = carrito.reduce((total, p) => total + p.cantidad, 0);
      contador.innerText = totalProductos;
      contador.style.display = totalProductos > 0 ? 'inline-block' : 'none';
    }
  
    function mostrarMensaje() {
      const mensaje = document.getElementById('mensajeExito');
      if (!mensaje) return;
      mensaje.style.display = 'block';
      setTimeout(() => mensaje.style.display = 'none', 2000);
    }
  
    document.querySelectorAll('.add-to-cart').forEach(boton => {
      boton.addEventListener('click', agregarProducto);
    });
  
    actualizarContador();
  });




  document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contenedor = document.getElementById('carritoContainer');
  
    if (carrito.length === 0) {
      contenedor.innerHTML = '<p>Tu bolsa está vacía </p>';
      actualizarContadorCarrito();
      return;
    }
  
    mostrarCarrito(carrito);
    actualizarContadorCarrito();
  });
  
  function mostrarCarrito(carrito) {
    const contenedor = document.getElementById('carritoContainer');
    let total = 0;
  
    contenedor.innerHTML = carrito.map((p, index) => {
      total += p.precio * p.cantidad;
      return `
        <div class="productoEnCarrito">
          <div class="productoInfo">
            <img src="${p.imagen}" alt="${p.titulo}" width="80">
            <div>
              <h4>${p.titulo}</h4>
              <p>Precio: ₡${p.precio.toLocaleString()} por unidad</p>
              <label for="cantidad-${index}">Cantidad:</label>
              <input type="number" id="cantidad-${index}" value="${p.cantidad}" min="1" onchange="actualizarCantidad(${index}, ${p.precio})">
              <p>Total por producto: ₡${(p.precio * p.cantidad).toLocaleString()}</p>
            </div>
          </div>
          <button class="eliminarBtn" onclick="eliminarProducto(${index})" title="Eliminar producto">
           ✕ 
          </button>
        </div>
        <hr>
      `;
    }).join('') + `
    <button onclick="finalizarCompra()">Finalizar compra</button>
      <h3>Total: ₡${total.toLocaleString()} CRC</h3>
    `;
  }
  
  function eliminarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1); // Elimina el producto en esa posición
  
    const contenedor = document.getElementById('carritoContainer'); // Definimos el contenedor
  
    localStorage.setItem('carrito', JSON.stringify(carrito));
  
    // Verificamos si el carrito quedó vacío después de eliminar
    if (carrito.length === 0) {
      contenedor.innerHTML = '<p>Tu bolsa está vacía </p>';
    } else {
      mostrarCarrito(carrito);
    }
  
    // Actualizamos el contador del carrito
    actualizarContadorCarrito();
  
    // Cerramos el formulario si está abierto
    const formularioCompra = document.getElementById('formularioCompra');
    if (formularioCompra.style.display === 'block') {
      formularioCompra.style.display = 'none'; // Cierra el formulario
    }
  }
  

  function actualizarCantidad(index, precio) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const nuevaCantidad = parseInt(document.getElementById(`cantidad-${index}`).value);
    const contenedor = document.getElementById('carritoContainer'); // Aseguramos acceso al contenedor
  
    if (nuevaCantidad > 0) {
      carrito[index].cantidad = nuevaCantidad;
    } else {
      // Si la cantidad es 0 o menor, se elimina el producto
      carrito.splice(index, 1);
    }
  
    localStorage.setItem('carrito', JSON.stringify(carrito));
  
    // Verificamos si el carrito quedó vacío después de eliminar
    if (carrito.length === 0) {
      contenedor.innerHTML = '<p>Tu bolsa está vacía </p>';
    } else {
      mostrarCarrito(carrito);
    }
  
    actualizarContadorCarrito();

      // Cerramos el formulario si está abierto
      const formularioCompra = document.getElementById('formularioCompra');
      if (formularioCompra.style.display === 'block') {
        formularioCompra.style.display = 'none'; // Cierra el formulario
      }
  }

  function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contadorCarrito = document.getElementById('contadorCarrito');
  
    // Contamos la cantidad total de productos en el carrito
    const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
  
    // Actualizamos el contador en el ícono del carrito
    if (contadorCarrito) {
      contadorCarrito.textContent = totalProductos;
    }
  }
  
  function finalizarCompra() {
    // Mostrar el formulario de compra
    document.getElementById('formularioCompra').style.display = 'block';
    // Hacer scroll suave hasta el formulario
    document.getElementById('formularioCompra').scrollIntoView({ behavior: 'smooth' });
  
    // Opcionalmente, si quieres ocultar el carrito después de mostrar el formulario
    document.getElementById('carritoContainer').style.display = 'none';
  }
  //-------------------------------------------------------------------------------------------------------------------EMAILJS
  document.getElementById("formularioCompra").addEventListener("submit", function (event) {
    event.preventDefault();
  
  
    const nombre = document.getElementById("nombres").value || 'No especificado';
    const email = document.querySelector('input[name="email"]').value || 'No especificado';
  
    const prov = document.getElementById("prov");
    const can = document.getElementById("can");
    const dis = document.getElementById("dis");
    const provincia = prov.options[prov.selectedIndex]?.text || 'No especificado';
    const canton = can.options[can.selectedIndex]?.text || 'No especificado';
    const distrito = dis.options[dis.selectedIndex]?.text || 'No especificado';
    const metodoPago = document.querySelector('input[name="metodo-pago"]:checked')?.value || 'No especificado';
  
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    console.log("Carrito al momento de enviar:", carrito);
  
    const productos_comprados = carrito.length > 0
      ? carrito.map(producto => `${producto.titulo} - Cantidad: ${producto.cantidad} - Precio: ₡${producto.precio}`).join('\n')
      : "No hay productos en el carrito.";
  
    const total_compra = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0).toLocaleString();
  
    const templateParams = {
      nombre_cliente: nombre,
      correo_cliente: email,
      direccion_completa: `${provincia}, ${canton}, ${distrito}`,
      metodo_pago: metodoPago,
      productos_comprados: productos_comprados,
      total_compra: total_compra
    };
  
    emailjs.send(
      'default_service',
      'template_icc09wk',
      templateParams,
      '77o0jYfFOfzNdg3Mj'
    ).then(function (response) {
      console.log('Correo enviado exitosamente', response);
      alert("Gracias por tu compra. El correo de confirmación fue enviado.");
    
      // Solo aquí limpiamos el carrito y recargamos
      localStorage.removeItem('carrito');
      document.getElementById("formularioCompra").reset();
      location.reload();
    }, function (error) {
      console.log('Error al enviar el correo', error);
      alert("Hubo un error al enviar el correo. Intenta nuevamente.");
    });
  });
  