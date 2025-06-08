// 1. Importar express
const express = require('express');
const cors = require('cors');
const { sql, poolPromise } = require('./Config/DB'); // Usa tu módulo de conexión
require('dotenv').config();

const app = express();
app.use(cors()); // 🔓 Habilita CORS para cualquier origen

// 2. Middleware para leer JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Ruta de prueba
//app.get('/usuarios', (req, res) => {
//  res.json([
//    { contraseña: 1234, usuario: 'Angel' },
//    { contraseña: 2468, usuario: 'Darlin' }
//  ]);
//});

// 4. Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// 5. Conexión a la base de datos (opcional, si se necesita)
app.get('/usuarios', async (req, res) => {
  try {
    const pool = await poolPromise; // Usa la conexión centralizada
    const result = await pool.request().query('SELECT contraseña, nombre FROM Usuarios');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al conectar con Azure SQL:', err);
    res.status(500).send('Error al obtener usuarios');
  }
});

app.get('/politicas_privacidad', (req, res) => {
  res.json({
    page: 'politicas_privacidad',
    title: 'Políticas de Privacidad',
    content: 'Aquí van las políticas de privacidad de Papasito\'s Mechanics.'
  });
});

app.get('/terminos_servicio', (req, res) => {
  res.json({
    page: 'terminos_servicio',
    title: 'Términos de Servicio',
    content: 'Aquí van los términos de servicio de Papasito\'s Mechanics.'
  });
});

app.get('/formulario_contacto', (req, res) => {
  res.json({
    page: 'formulario_contacto',
    title: 'Formulario de Contacto',
    content: 'Aquí va el formulario de contacto de Papasito\'s Mechanics.'
  });
});

//app.get('/solicitud_servicio', (req, res) => {
//  res.json({
//    page: 'solicitud_servicio',
//    title: 'Solicitud de Servicio',
//    content: 'Aquí puedes realizar tu solicitud de servicio para Papasito\'s Mechanics.'
//  });
//});

// Array temporal para almacenar solicitudes (solo mientras el servidor está encendido)
const solicitudes = [];

// POST: Recibe y guarda la solicitud
app.post('/solicitud_servicio', (req, res) => {
  solicitudes.push(req.body); // Guarda la solicitud en el array
  console.log('Solicitud recibida:', req.body);
  res.json({ message: 'Solicitud recibida correctamente', data: req.body });
});

// GET: Devuelve todas las solicitudes recibidas
app.get('/solicitud_servicio', (req, res) => {
  
  if (solicitudes.length === 0) {
    res.json({
        message: 'No hay solicitudes disponibles.'
      });
  } else {
    res.json({
    title: 'Solicitudes Actuales:', 
    solicitudes
  })};
});

// Rutas para la gestión de usuarios
const router = express.Router();

// Ruta para registrar usuario
router.post('/register', async (req, res) => {
  try {
    console.log('Datos recibidos en el backend:', req.body);
    const { nombre, correo, contraseña, id_cliente } = req.body;
    if (!nombre || !correo || !contraseña || !id_cliente) {
      return res.status(400).json({ error: 'Faltan datos obligatorios.' });
    }
    const pool = await poolPromise;
    await pool.request()
      .input('nombre', sql.VarChar(20), nombre)
      .input('correo', sql.VarChar(100), correo)
      .input('contraseña', sql.VarChar(100), contraseña)
      .input('id_cliente', sql.Int, parseInt(id_cliente))
      .query('INSERT INTO Usuarios (nombre, correo, contraseña, id_cliente) VALUES (@nombre, @correo, @contraseña, @id_cliente)');
    res.json({ message: 'Usuario registrado correctamente.' });
  } catch (err) {
    console.error('Error al registrar usuario:', err);
    res.status(500).json({ error: 'Error al registrar usuario.' });
  }
});

app.use('/api', router);

