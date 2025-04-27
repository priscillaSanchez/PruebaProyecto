function finalizarCompra() {
  // Limpiar carrito
  localStorage.removeItem('carrito');

  // Mostrar el formulario
  document.getElementById('formularioCompra').style.display = 'block';

  // Hacer scroll suave hasta el formulario
  document.getElementById('formularioCompra').scrollIntoView({ behavior: 'smooth' });
}


function buscarContribuyente() {
    const identificacion = document.getElementById('identificacion').value.trim();
  
    if (!identificacion) {
      alert('Por favor ingresa una identificación');
      return;
    }
  
    fetch(`https://api.hacienda.go.cr/fe/ae?identificacion=${identificacion}`)
      .then(res => {
        if (!res.ok) throw new Error('No se encontró el contribuyente');
        return res.json();
      })
      .then(data => {
        if (data.nombre) {
          const nombreInput = document.getElementById('nombres');
          nombreInput.value = data.nombre;
          nombreInput.style.display = 'block'; // ← Esto muestra el input
        } else {
          alert('No se encontró el nombre en la respuesta.');
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error al consultar la API de Hacienda');
      });
  }
  
