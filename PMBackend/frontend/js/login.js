// Variables globales para almacenar los datos ingresados
window.usuarioIngresado = '';
window.contraseñaIngresada = '';
// Creamos una lista para almacenar los usuarios
window.usuarios = [];

// Espera a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Selecciona el botón de Sign in
  const btnSignIn = document.querySelector('.btn-signin');
  if (btnSignIn) {
    btnSignIn.addEventListener('click', function(e) {
      e.preventDefault();
      // Obtiene los valores de los campos de usuario y contraseña
      const usernameInput = document.querySelector('input[name="username"]');
      const passwordInput = document.querySelector('input[name="password"]');
      if (usernameInput.value.length >= 1 && passwordInput.value.length >= 1) {
        var flag = false;
        // Asigna los valores a las variables globales
        window.usuarioIngresado = usernameInput.value;
        window.contraseñaIngresada = passwordInput.value;
        console.log('Usuario ingresado:', window.usuarioIngresado);
        console.log('Contraseña ingresada:', window.contraseñaIngresada);
        usuarios.forEach(usuario => {
            if (usuarioIngresado == usuario.nombre && contraseñaIngresada == usuario.contraseña) {
                console.log('Usuario y contraseña válidos.');
                flag = true;
            }
        });
        // Verifica si el usuario y la contraseña son válidos
        if (!flag) {
          console.error('Usuario o contraseña incorrectos.');
          alert('Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.');
        }
        else {
            console.log('Usuario y contraseña válidos.');
            //alert('Inicio de sesión exitoso.');
            // Cambia las clases usando JavaScript puro
            const btnAnimate = document.querySelector('.btn-animate');
            const welcome = document.querySelector('.welcome');
            const coverPhoto = document.querySelector('.cover-photo');
            const frame = document.querySelector('.frame');
            const profilePhoto = document.querySelector('.profile-photo');
            const btnGoBack = document.querySelector('.btn-goback');
            const forgot = document.querySelector('.forgot');
            if (btnAnimate) btnAnimate.classList.toggle('btn-animate-grow');
            if (welcome) {
              welcome.textContent = `Welcome ${window.usuarioIngresado}`;
              welcome.classList.toggle('welcome-left');
            }
            if (coverPhoto) coverPhoto.classList.toggle('cover-photo-down');
            if (frame) frame.classList.toggle('frame-short');
            if (profilePhoto) profilePhoto.classList.toggle('profile-photo-down');
            if (btnGoBack) btnGoBack.classList.toggle('btn-goback-up');
            if (forgot) forgot.classList.toggle('forgot-fade');
        }
      }
      else {
        console.error('Los campos de usuario o contraseña no han sido ingresados.');
        alert('Por favor, ingresa un usuario y una contraseña válidos.');
      }
    });
  }

  // REGISTRO DE USUARIO
  const btnSignUp = document.querySelector('.btn-signup');
  if (btnSignUp) {
    btnSignUp.addEventListener('click', async function(e) {
      console.log('Click en Sign Up');
      e.preventDefault();
      // Selecciona SOLO los campos del formulario de registro
      const form = document.querySelector('.form-signup');
      const fullname = form.querySelector('input[name="fullname"]').value;
      const email = form.querySelector('input[name="email"]').value;
      const password = form.querySelector('input[name="rpassword"]').value;
      const id_cliente = form.querySelector('input[name="id_cliente"]').value;

      // Validación básica
      if (!fullname || !email || !password || !id_cliente) {
        alert('Por favor, completa todos los campos para registrarte.');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: fullname,
            correo: email,
            contraseña: password,
            id_cliente: id_cliente
          })
        });

        const data = await response.json();
        if (response.ok) {
          alert('¡Usuario registrado correctamente!');
          form.reset();
          // Opcional: muestra la animación de éxito
          const successDiv = document.querySelector('.success');
          if (successDiv) successDiv.style.display = 'block';
        } else {
          alert(data.error || 'Error al registrar usuario.');
        }
      } catch (error) {
        alert('Error de conexión con el servidor.');
        console.error(error);
      }
    });
  }
});


// Hacemos una petición GET al backend
fetch('http://localhost:3000/usuarios')
  .then(response => response.json())
  .then(data => {
    // Guardamos los usuarios en la lista
    usuarios.push(...data);
    if (usuarios.length === 0) {
      console.log('No hay usuarios disponibles.');
      return;
    }
    else {
      console.log('Usuarios obtenidos:', usuarios);
    }
    //const lista = document.getElementById('lista-usuarios');
    usuarios.forEach(usuario => {
      console.log(`Contr: ${usuario.contraseña}, Nomb: ${usuario.nombre}`);
      //const li = document.createElement('li');
      //li.textContent = `Contr: ${usuario.contraseña}, Nomb: ${usuario.usuario}`;
      //lista.appendChild(li);
    });
  })
  .catch(error => {
    console.error('Error al obtener usuarios:', error);
  });
