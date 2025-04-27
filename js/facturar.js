window.onload = cargaInicial();

function cargaInicial() {
    cargarProvincias();
}

var cmbProvincia = document.getElementById('prov');
var cmbCanton = document.getElementById('can');
var cmbDistrito = document.getElementById('dis');


// https://programando.paginasweb.cr/2016/04/29/lista-de-provincias-cantones-y-distritos-de-costa-rica-en-formato-json/

// 1. Cargar de Provincias
// Cuando se cargue la pantalla el “Select” de provincias deberá aparecer cargado con los datos de las 
// provincias mediante el consumo del api respectivo.
// ----------------------- provincias -----------------------
// consola // js
function cargarProvincias() {
    //  Llama a la API con fetch
    fetch('https://ubicaciones.paginasweb.cr/provincias.json')
        .then((res) => res.json()) //solicitud HTTP para obtener los datos.
     //Convierte la respuesta en formato JSON (JavaScript Object Notation).   
        .then((data) => {
            var obj = data;
            var keys = Object.keys(obj);

            cmbProvincia.innerHTML = ''; // limpia el select (esto puede causar error si cmbProvincia no existe)

            for (var i = 0; i < keys.length; i++) {
                var option = $(
                    '<option value="' + keys[i] + '">' + obj[keys[i]] + '</option>' //Object.keys(obj) convierte este objeto:  "1": "San José",

                );
                $('#prov').append(option);
            }

            cambioSelect('P');  // llama otra función q carga los cantones
        })
        .catch((err) => {
            console.log(err);// muestra errores si hay problemas con la conexión o la API
        });
}
cargarProvincias();


// 2. Cargar de Cantones
// Cada vez que se seleccione una provincia se deberá cargar los cantones respectivos a la provincia seleccionada, 
// mediante el consumo del api respectivo.
// ----------------------- Cantones -----------------------
// consola // js
function cargarCantones() {
  fetch('https://ubicaciones.paginasweb.cr/provincia/1/cantones.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al cargar los cantones');
      }
      return response.json();
    })
    .then(cantones => {
      console.log(cantones);
      // Aquí podés trabajar con los datos recibidos, como llenar un <select> por ejemplo
    })
    .catch(error => {
      console.error('Hubo un problema con la petición fetch:', error);
    });
}

cargarCantones();


// Cargar de Distritos
// Cada vez que se seleccione un cantón se deberá cargar los distritos respectivos al cantón y provincia seleccionada,
// mediante el consumo del api respectivo.
// ----------------------- Distritos -----------------------
// consola // js
function cargarDistritos() {
  fetch('https://ubicaciones.paginasweb.cr/provincia/1/canton/1/distritos.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al cargar los distritos');
      }
      return response.json();
    })
    .then(distritos => {
      console.log(distritos);
      // Aquí podés trabajar con los datos, como llenar un <select>
    })
    .catch(error => {
      console.error('Hubo un problema con la petición fetch:', error);
    });
}

cargarDistritos();

// CARGAR DEPENDIENDO DE LA PROVINCIA
function cargarProvincias() {
    fetch('https://ubicaciones.paginasweb.cr/provincias.json')
        .then((res) => res.json())
        .then((data) => {
            var obj = data;
            var keys = Object.keys(obj);

            cmbProvincia.innerHTML = '';

            for (var i = 0; i < keys.length; i++) {
                var option = $(
                    '<option value="' + keys[i] + '">' + obj[keys[i]] + '</option>'
                );
                $('#prov').append(option);
            }

            cambioSelect('P');
        })
        .catch((err) => {
            console.log(err);
        });
}

function cambioSelect(p) {
    if (p == 'P') {
        fetch(
            `https://ubicaciones.paginasweb.cr/provincia/${cmbProvincia.value}/cantones.json`
        )
            .then((res) => res.json())
            .then((data) => {
                var obj = data;
                var keys = Object.keys(obj);

                cmbCanton.innerHTML = '';

                for (var i = 0; i < keys.length; i++) {
                    var option = $(
                        '<option value="' + keys[i] + '">' + obj[keys[i]] + '</option>'
                    );
                    $('#can').append(option);
                }
                cambioSelect('C');
            })
            .catch((err) => {
                console.log(err);
            });
    } else if (p == 'C') {
        fetch(
            `https://ubicaciones.paginasweb.cr/provincia/${cmbProvincia.value}/canton/${cmbCanton.value}/distritos.json`
        )
            .then((res) => res.json())
            .then((data) => {
                var obj = data;
                var keys = Object.keys(obj);

                cmbDistrito.innerHTML = '';

                for (var i = 0; i < keys.length; i++) {
                    var option = $(
                        '<option value="' + keys[i] + '">' + obj[keys[i]] + '</option>'
                    );
                    $('#dis').append(option);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

 // Función para formatear la fecha con '/' después de 2 dígitos
 function formatearFecha(input) {
    let value = input.value.replace(/\D/g, ''); // Eliminar todo lo que no sea número
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4); // Agregar '/' después de 2 dígitos
    }
    input.value = value;

    // Validar la fecha de expiración
    validarFechaExpiracion(value);
  }

  // Función para validar que la fecha no esté vencida
  function validarFechaExpiracion(value) {
    const errorElement = document.getElementById('expiracion-error');
    if (value.length === 5) {
      const [mes, anio] = value.split('/').map(Number);
      const fechaActual = new Date();
      const fechaExpiracion = new Date(`20${anio}`, mes - 1); // Mes es 0-indexado en JS, así que restamos 1

      // Si la fecha es menor que la fecha actual, mostrar "X"
      if (fechaExpiracion < fechaActual) {
        errorElement.style.display = 'inline'; // Mostrar X si está vencida
      } else {
        errorElement.style.display = 'none'; // Ocultar X si no está vencida
      }
    }
  }



  document.addEventListener('DOMContentLoaded', function () {
    const radioTarjeta = document.getElementById('tarjeta-credito');
    const radioSinpe = document.getElementById('SINPE');

    const formularioTarjeta = document.getElementById('formulario-tarjeta');
    const mensajeSinpe = document.getElementById('mensaje-sinpe');

    function actualizarMetodoPago() {
      if (radioTarjeta.checked) {
        formularioTarjeta.style.display = 'block';
        mensajeSinpe.style.display = 'none';
      } else if (radioSinpe.checked) {
        formularioTarjeta.style.display = 'none';
        mensajeSinpe.style.display = 'block';
      }
    }

    // Escuchar los cambios
    radioTarjeta.addEventListener('change', actualizarMetodoPago);
    radioSinpe.addEventListener('change', actualizarMetodoPago);

    // Ejecutar al inicio
    actualizarMetodoPago();
  });


//detectar tarjeta
  function detectarTipoTarjeta(input) {
    const valor = input.value.replace(/\s+/g, '');
    const logo = document.getElementById("logo-tarjeta");
    const error = document.getElementById("tarjeta-error");
  
    // Formatear con espacios cada 4 dígitos
    input.value = valor.replace(/(\d{4})(?=\d)/g, "$1 ");
  
    // Detectar tipo de tarjeta
    let tipo = "";
    if (/^4/.test(valor)) {
      tipo = "visa";
    } else if (/^5[1-5]/.test(valor) || /^2(2[2-9]|[3-6][0-9]|7[01]|720)/.test(valor)) {
      tipo = "mastercard";
    } else {
      tipo = "";
    }
  
    // Mostrar imagen o X según el caso
    if (tipo === "visa") {
      logo.src = "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg";
      logo.style.display = "inline";
      error.style.display = "none";
    } else if (tipo === "mastercard") {
      logo.src = "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg";
      logo.style.display = "inline";
      error.style.display = "none";
    } else {
      logo.style.display = "none";
      // Solo mostrar la X si hay más de 6 dígitos (como para que ya tenga sentido evaluar)
      error.style.display = valor.length >= 6 ? "inline" : "none";
    }
  }
  

// EMAIL JS _____________________________________________________________________________________________________________________________
