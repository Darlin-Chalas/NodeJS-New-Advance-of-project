window.arrayObs = ["0","0","0","0","0","0","0","0","0","0"]; // Cadena para manejar las observaciones

document.addEventListener('DOMContentLoaded', function() {
    // Verifica si el usuario está autenticado
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = '/PMBackend/frontend/index.html'; // Redirige al login si no está autenticado
    } else {
        // Si está autenticado, muestra el nombre del cliente
        const nombreCliente = localStorage.getItem('nombre_cliente');
        const welcomeMessage = document.querySelector('.welcome-message');
        if (welcomeMessage) {
        welcomeMessage.textContent = `Bienvenido, ${nombreCliente}`;
        }
        const labelNombre = document.querySelector('.client-name');
        if (labelNombre) {
        labelNombre.textContent = `Bienvenido de nuevo ${nombreCliente}!`;
        }
    }
    Autocompletar();
    
});

const Autocompletar = function() {
// Autocompletar nombre y correo
  const nombre = localStorage.getItem('nombre_cliente');
  const correo = localStorage.getItem('correo_cliente');
  const telefono = localStorage.getItem('telefono_cliente');
  if (nombre) {
    const nombreInput = document.querySelector('input[name="nombre"]');
    if (nombreInput) {
      nombreInput.value = nombre;
      nombreInput.readOnly = true;
    }
  }
  if (correo) {
    const emailInput = document.querySelector('input[name="email"]');
    if (emailInput) {
      emailInput.value = correo;
      emailInput.readOnly = true;
    }
  }
  if (telefono) {
    const telefonoInput = document.querySelector('input[name="telefono"]');
    if (telefonoInput) {
      telefonoInput.value = telefono;
      telefonoInput.readOnly = true;
    }
  }
  else
  {
    console.log("No se encontró el número de teléfono en localStorage.");
  }
}

// Maneja el envío del formulario usando JavaScript
document.querySelector('form').addEventListener('submit', async function(e) {
  e.preventDefault(); // Evita el envío tradicional

  const form = e.target;
  const formData = new FormData(form);

  // Lista de campos obligatorios (excepto inventario)
  const requiredFields = [
    'Marca', 'Modelo', 'Color', 'Kilometraje', 'Placas', 'NumeroDeSerie'
  ];

  // Verifica si algún campo obligatorio está vacío
  for (const field of requiredFields) {
    if (!formData.get(field) || formData.get(field).trim() === '') {
      alert('Por favor, complete todos los campos obligatorios antes de enviar la solicitud.');
      return;
    }
  }

  const data = Object.fromEntries(formData.entries());

  // Agrega el id_cliente desde localStorage antes de enviar
  const id_cliente = localStorage.getItem('id_cliente');
  if (id_cliente) {
    data.id_cliente = id_cliente;
  }

  // Agrega la fecha de registro actual
  data.fecha_registro = new Date().toISOString();

  try {
    // Envía los datos al backend usando fetch
    const response = await fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    form.reset();
  } catch (error) {
    console.error('Error al enviar la solicitud:', error);
    alert('Ocurrió un error al enviar la solicitud. Por favor, inténtelo de nuevo.');
    return;
  }

  // 1. Obtén los índices de las imágenes activas
  //const imagenesSeleccionadas = window.imagenesObservaciones.getActivas();
  // 2. Si prefieres guardar los nombres de archivo en vez de índices:
  //const observacionImgs = Array.from(document.querySelectorAll('.list-inline-item img'));
  //data.imagenes_observaciones = imagenesSeleccionadas.map(idx => {
  //const img = observacionImgs[idx];
  //return img ? img.getAttribute('src') : null;
  //}).filter(Boolean);

  //if (response.ok) {
  //  alert('¡Solicitud enviada correctamente!, le estaremos contactando pronto!.');
  // 
  //}
});

// Métodos para activar/desactivar imágenes de observaciones
document.addEventListener('DOMContentLoaded', function() {

  // Seccion visual del manejo de imágenes de observaciones
  // Selecciona todas las imágenes del apartado de observaciones
  const observacionImgs = Array.from(document.querySelectorAll(
    '.list-inline-item img'
  ));

  // Método para activar una imagen (agrega clase 'img-activa')
  function activarImagenObs(index) {
    if (observacionImgs[index]) {
      observacionImgs[index].classList.add('img-activa');
    }
  }

  // Método para desactivar una imagen (quita clase 'img-activa')
  function desactivarImagenObs(index) {
    if (observacionImgs[index]) {
      observacionImgs[index].classList.remove('img-activa');
    }
  }

  // Método para desactivar todas las imágenes(para cuando se envía el formulario, se quitan las clases 'img-activa')
  function desactivarTodasImagenesObs() {
    observacionImgs.forEach(img => img.classList.remove('img-activa'));
  }

  // Alternar estado al hacer click
  observacionImgs.forEach((img, idx) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      img.classList.toggle('img-activa');
    });
  });

  // Puedes exportar los métodos si los necesitas en otro lado
  window.imagenesObservaciones = {
    activar: activarImagenObs,
    desactivar: desactivarImagenObs,
    desactivarTodas: desactivarTodasImagenesObs,
    getActivas: () => observacionImgs
      .map((img, idx) => img.classList.contains('img-activa') ? idx : null)
      .filter(idx => idx !== null)
  };

  
  // Seccion funcional del manejo de imágenes de observaciones
  const img1 = document.querySelector('.img-button-one');
  const img2 = document.querySelector('.img-button-two');
  const img3 = document.querySelector('.img-button-three');
  const img4 = document.querySelector('.img-button-four');
  const img5 = document.querySelector('.img-button-five');
  const img6 = document.querySelector('.img-button-six');
  const img7 = document.querySelector('.img-button-seven');
  const img8 = document.querySelector('.img-button-eight');
  const img9 = document.querySelector('.img-button-nine');
  const img10 = document.querySelector('.img-button-ten');
  img1active = false;
  img2active = false;
  img3active = false;
  img4active = false;
  img5active = false;
  img6active = false;
  img7active = false;
  img8active = false;
  img9active = false;
  img10active = false;
  
  //Eventos de manejo del array
  img1.addEventListener('click', function() {
      if (img1active) {
          img1active = false;
          arrayObs[0] = "0";
          console.log("Cadena de observaciones: " + arrayObs);
      } else {
        img1active = true;
        arrayObs[0] = "1";
        console.log("Cadena de observaciones: " + arrayObs);
      }
  });
  img2.addEventListener('click', function() {
      if (img2active) {
          img2active = false;
          arrayObs[1] = "0";
          console.log("Cadena de observaciones: " + arrayObs);
      } else {
          img2active = true;
          arrayObs[1] = "1";
          console.log("Cadena de observaciones: " + arrayObs);
      }
  });
  img3.addEventListener('click', function() {
      if (img3active) {
          img3active = false;
          arrayObs[2] = "0";
          console.log("Cadena de observaciones: " + arrayObs);
      } else {
          img3active = true;
          arrayObs[2] = "1";
          console.log("Cadena de observaciones: " + arrayObs);
      }
  });
  img4.addEventListener('click', function() {
      if (img4active) {
          img4active = false;
          arrayObs[3] = "0";
          console.log("Cadena de observaciones: " + arrayObs);
      } else {
          img4active = true;
          arrayObs[3] = "1";
          console.log("Cadena de observaciones: " + arrayObs);
      }
  });
  img5.addEventListener('click', function() {
      if (img5active) {
          img5active = false;
          arrayObs[4] = "0";
          console.log("Cadena de observaciones: " + arrayObs);
      } else {
          img5active = true;
          arrayObs[4] = "1";
          console.log("Cadena de observaciones: " + arrayObs);
      }
  });
  img6.addEventListener('click', function() {
      if (img6active) {
          img6active = false;
          arrayObs[5] = "0";
          console.log("Cadena de observaciones: " + arrayObs);
      } else {
          img6active = true;
          arrayObs[5] = "1";
          console.log("Cadena de observaciones: " + arrayObs);
      }
  });
  img7.addEventListener('click', function() {
      if (img7active) {
          img7active = false;
          arrayObs[6] = "0";
          console.log("Cadena de observaciones: " + arrayObs);
      } else {
          img7active = true;
          arrayObs[6] = "1";
          console.log("Cadena de observaciones: " + arrayObs);
      }
  });
  img8.addEventListener('click', function() {
      if (img8active) {
          img8active = false;
          arrayObs[7] = "0";
          console.log("Cadena de observaciones: " + arrayObs);
      } else {
          img8active = true;
          arrayObs[7] = "1";
          console.log("Cadena de observaciones: " + arrayObs);
      }
  });
  img9.addEventListener('click', function() {
      if (img9active) {
          img9active = false;
          arrayObs[8] = "0";
          console.log("Cadena de observaciones: " + arrayObs);
      } else {
          img9active = true;
          arrayObs[8] = "1";
          console.log("Cadena de observaciones: " + arrayObs);
      }
  });
  img10.addEventListener('click', function() {
      if (img10active) {
          img10active = false;
          arrayObs[9] = "0";
          console.log("Cadena de observaciones: " + arrayObs);
      } else {
          img10active = true;
          arrayObs[9] = "1";
          console.log("Cadena de observaciones: " + arrayObs);
      }
  });
});

const CrearCadenaDeObservaciones = function() {
  // Crea una cadena de observaciones a partir del array
  const cadena = arrayObs.join('');
  console.log("Cadena de observaciones creada: " + cadena);
  return cadena;
}