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
  data.fecha_registro = new Date().toISOString(); // formato ISO, ejemplo: "2025-06-12T18:30:00.000Z"

  // Envía los datos al backend usando fetch
  const response = await fetch(form.action, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

    if (response.ok) {
      alert('¡Solicitud enviada correctamente!, le estaremos contactando pronto!.');
      form.reset();
    }
});