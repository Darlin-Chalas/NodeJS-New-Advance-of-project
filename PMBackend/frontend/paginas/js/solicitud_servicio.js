// ===================
// 1. Variables globales
// ===================
window.arrayObs = ["0","0","0","0","0","0","0","0","0","0"]; // Observaciones
window.arrayInv = ["0","0","0","0","0","0","0","0","0","0","0","0"]; // Inventario

// ===================
// 2. Autenticación y bienvenida
// ===================
document.addEventListener('DOMContentLoaded', function() {
    // Verifica si el usuario está autenticado
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = '/PMBackend/frontend/index.html';
    } else {
        // Muestra el nombre del cliente
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

// ===================
// 3. Autocompletar datos del cliente
// ===================
const Autocompletar = function() {
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
};

// ===================
// 4. Observaciones (manejo de imágenes)
// ===================
const observacionImgs = [
    document.querySelector('.img-button-one'),
    document.querySelector('.img-button-two'),
    document.querySelector('.img-button-three'),
    document.querySelector('.img-button-four'),
    document.querySelector('.img-button-five'),
    document.querySelector('.img-button-six'),
    document.querySelector('.img-button-seven'),
    document.querySelector('.img-button-eight'),
    document.querySelector('.img-button-nine'),
    document.querySelector('.img-button-ten')
];

let img1active = false, img2active = false, img3active = false, img4active = false, img5active = false,
    img6active = false, img7active = false, img8active = false, img9active = false, img10active = false;

// Alternar estado al hacer click
observacionImgs.forEach((img, idx) => {
    if (img) {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            img.classList.toggle('img-activa');
            // Manejo del arrayObs y variables de estado
            switch(idx) {
                case 0: img1active = !img1active; arrayObs[0] = img1active ? "1" : "0"; break;
                case 1: img2active = !img2active; arrayObs[1] = img2active ? "1" : "0"; break;
                case 2: img3active = !img3active; arrayObs[2] = img3active ? "1" : "0"; break;
                case 3: img4active = !img4active; arrayObs[3] = img4active ? "1" : "0"; break;
                case 4: img5active = !img5active; arrayObs[4] = img5active ? "1" : "0"; break;
                case 5: img6active = !img6active; arrayObs[5] = img6active ? "1" : "0"; break;
                case 6: img7active = !img7active; arrayObs[6] = img7active ? "1" : "0"; break;
                case 7: img8active = !img8active; arrayObs[7] = img8active ? "1" : "0"; break;
                case 8: img9active = !img9active; arrayObs[8] = img9active ? "1" : "0"; break;
                case 9: img10active = !img10active; arrayObs[9] = img10active ? "1" : "0"; break;
            }
            console.log("Cadena de observaciones: " + arrayObs);
        });
    }
});

// Métodos utilitarios para observaciones
function activarImagenObs(index) {
    if (observacionImgs[index]) {
        observacionImgs[index].classList.add('img-activa');
    }
}
function desactivarImagenObs(index) {
    if (observacionImgs[index]) {
        observacionImgs[index].classList.remove('img-activa');
    }
}
function desactivarTodasImagenesObs() {
    observacionImgs.forEach(img => img.classList.remove('img-activa'));
}
window.imagenesObservaciones = {
    activar: activarImagenObs,
    desactivar: desactivarImagenObs,
    desactivarTodas: desactivarTodasImagenesObs,
    getActivas: () => observacionImgs
        .map((img, idx) => img.classList.contains('img-activa') ? idx : null)
        .filter(idx => idx !== null)
};

// ===================
// 5. Inventario (manejo de checkboxes)
// ===================
document.addEventListener('DOMContentLoaded', function() {
    for (let i = 1; i <= 12; i++) {
        const checkbox = document.querySelector(`.inv-checkbox-${i}`);
        if (checkbox) {
            checkbox.addEventListener('change', function() {
                window.arrayInv[i-1] = checkbox.checked ? "1" : "0";
                console.log("Cadena de inventario:", window.arrayInv);
            });
        }
    }
});

// ===================
// 6. Utilidades para enviar datos
// ===================
const CrearCadenaDeObservaciones = function() {
    const cadena = arrayObs.join('');
    console.log("Cadena de observaciones creada: " + cadena);
    return cadena;
}
const CrearCadenaDeInventario = function() {
    const cadena = arrayInv.join('');
    console.log("Cadena de inventario creada:", cadena);
    return cadena;
}

// ===================
// 7. Envío del formulario
// ===================
document.querySelector('form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const cadenaInventario = CrearCadenaDeInventario();
    data.inventario = cadenaInventario;
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

    // Observaciones
    const cadenaObservaciones = CrearCadenaDeObservaciones();
    //const id_cliente = localStorage.getItem('id_cliente');

    if (!id_cliente) {
        alert('No se encontró el ID del cliente.');
        return;
    }

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

    // Luego envía las observaciones
    try {
        const responseObs = await fetch('http://localhost:3000/registrar_observaciones', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_cliente, observaciones: cadenaObservaciones })
        });

        if (responseObs.ok) {
            alert('¡Observaciones enviadas correctamente!');
            window.imagenesObservaciones.desactivarTodas();
        } else {
            alert('Error al enviar las observaciones.');
        }
    } catch (error) {
        console.error('Error al enviar las observaciones:', error);
        alert('Ocurrió un error al enviar las observaciones. Por favor, inténtelo de nuevo.');
    }

    // Luego envia los datos del inventario
    try {
        const responseInv = await fetch('http://localhost:3000/registrar_inventario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_cliente, inventario: CrearCadenaDeInventario() })
        });

        if (responseInv.ok) {
            alert('¡Inventario enviado correctamente!');
        } else {
            alert('Error al enviar el inventario.');
        }
    } catch (error) {
        console.error('Error al enviar el inventario:', error);
        alert('Ocurrió un error al enviar el inventario. Por favor, inténtelo de nuevo.');
    }
});