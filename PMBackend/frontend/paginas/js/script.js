// Al cargar la página principal
if (localStorage.getItem('isLoggedIn') !== 'true') {
  window.location.href = '/PMBackend/frontend/index.html'; // Redirige al login si no está autenticado
}

// Manejo del evento para cerrar sesión
//const btnLogout = document.querySelector('.btn-logout');
//if (btnLogout) {
//  btnLogout.addEventListener('click', function(e) {
//    e.preventDefault();
//    // Limpia el almacenamiento local y redirige al login
//    localStorage.removeItem('id_cliente');
//    localStorage.removeItem('nombre_cliente');
//    localStorage.removeItem('correo_cliente');
//    localStorage.removeItem('isLoggedIn');
//    window.location.href = 'login.html';
//  });
//}