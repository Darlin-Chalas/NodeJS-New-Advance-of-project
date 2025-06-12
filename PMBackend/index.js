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
    const result = await pool.request().query('SELECT correo, contraseña FROM Usuarios');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al conectar con Azure SQL:', err);
    res.status(500).send('Error al obtener usuarios');
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////La ruta del diablo no funciona coño
//La ruta de lo cliente coñaso no funciona diablo coñaaaso

app.get('/clientes', async(req, res) => {
  try {
    const pool = await poolPromise; // Usa la conexión centralizada
    const result = await pool.request().query('SELECT id_cliente, correo, nombre FROM Clientes');
    //console.log('Datos de clientes:', result.recordset); // Para depuración
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al conectar con Azure SQL:', err);
    res.status(500).send('Error al obtener clientes');
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

// POST: Recibe y guarda la solicitud de servicio
app.post('/solicitud_servicio', async (req, res) => {
  try {
    const {
      id_cliente, // este debe venir del frontend
      Marca, Modelo, Color, Kilometraje, Placas, ['Numero de Serie']: NumeroDeSerie,
      ingreso, salida, telefono, trabajo_realizar, observaciones, ingreso_grua,
      inventario_gato, inventario_herramientas, inventario_triangulos, inventario_tapetes,
      inventario_llanta_refaccion, inventario_extintor, inventario_antena, inventario_emblemas,
      inventario_tapetes_rueda, inventario_cables, inventario_estereo, inventario_encendedor
    } = req.body;

    const pool = await poolPromise;
    await pool.request()
      .input('id_cliente', id_cliente)
      .input('fecha_ingreso', ingreso)
      .input('fecha_salida', salida)
      .input('Marca', Marca)
      .input('Modelo', Modelo)
      .input('Color', Color)
      .input('Kilometraje', Kilometraje)
      .input('Placas', Placas)
      .input('NumeroDeSerie', NumeroDeSerie)
      .input('Ingreso_grua', ingreso_grua)
      .input('Telefono', telefono)
      .input('Trabajo_realizar', trabajo_realizar)
      .input('Observaciones', observaciones)
      .input('Inventario_gato', inventario_gato || '')
      .input('Inventario_herramientas', inventario_herramientas || '')
      .input('Inventario_triangulos', inventario_triangulos || '')
      .input('Inventario_tapetes', inventario_tapetes || '')
      .input('Inventario_llanta_refaccion', inventario_llanta_refaccion || '')
      .input('Inventario_extintor', inventario_extintor || '')
      .input('Inventario_antena', inventario_antena || '')
      .input('Inventario_emblemas', inventario_emblemas || '')
      .input('Inventario_tapetes_rueda', inventario_tapetes_rueda || '')
      .input('Inventario_cables', inventario_cables || '')
      .input('Inventario_estereo', inventario_estereo || '')
      .input('Inventario_encendedor', inventario_encendedor || '')
      .query(`
        INSERT INTO OrdenesDeServicio (
          id_cliente, fecha_ingreso, fecha_salida, Marca, Modelo, Color, Kilometraje, Placas, [Numero de Serie], Ingreso_grua, Telefono, Trabajo_realizar, Observaciones,
          Inventario_gato, Inventario_herramientas, Inventario_triangulos, Inventario_tapetes, inventario_llanta_refaccion, Inventario_extintor, Inventario_antena,
          Inventario_emblemas, Inventario_tapetes_rueda, Inventario_cables, Inventario_estereo, Inventario_encendedor
        ) VALUES (
          @id_cliente, @fecha_ingreso, @fecha_salida, @Marca, @Modelo, @Color, @Kilometraje, @Placas, @NumeroDeSerie, @Ingreso_grua, @Telefono, @Trabajo_realizar, @Observaciones,
          @Inventario_gato, @Inventario_herramientas, @Inventario_triangulos, @Inventario_tapetes, @Inventario_llanta_refaccion, @Inventario_extintor, @Inventario_antena,
          @Inventario_emblemas, @Inventario_tapetes_rueda, @Inventario_cables, @Inventario_estereo, @Inventario_encendedor
        )
      `);

    res.json({ message: 'Orden de servicio guardada correctamente' });
  } catch (err) {
    console.error('Error al guardar orden de servicio:', err);
    res.status(500).send('Error al guardar orden de servicio');
  }
});

// GET: Devuelve todas las solicitudes recibidas
app.get('/solicitud_servicio', (req, res) => {
  
  if (solicitudes.length === 0) {
    res.json({
        message: 'No hay solicitudes disponibles.'
      });
  } else {
    res.json({
    solicitudes 
  })};
});

// Rutas para la gestión de usuarios
const router = express.Router();

// Ruta para obtener todos los clientes
//router.get('/clientes', async (req, res) => {
//  try {
//    const pool = await poolPromise;
//    const result = await pool.request().query('SELECT id_cliente, correo FROM Clientes');
//    res.json(result.recordset);
//  } catch (err) {
//    console.error('Error al obtener clientes:', err);
//    res.status(500).json({ error: 'Error al obtener clientes.' });
//  }
//});

// Ruta para registrar usuario
router.post('/registrar_usuario', async (req, res) => {
  try {
    console.log('Datos recibidos en el backend:', req.body);
    const { contraseña, id_cliente } = req.body;
    if (!!contraseña || !id_cliente) {
      return res.status(400).json({ error: 'Faltan datos obligatorios.' });
    }
    const pool = await poolPromise;
    await pool.request()
      .input('correo', sql.VarChar(100), correo)
      .input('contraseña', sql.VarChar(100), contraseña)
      .input('id_cliente', sql.Int, parseInt(id_cliente))
      .query('INSERT INTO Usuarios (contraseña, id_cliente) VALUES ( @contraseña, @id_cliente)');
    res.json({ message: 'Usuario registrado correctamente.' });
  } catch (err) {
    console.error('Error al registrar usuario:', err);
    res.status(500).json({ error: 'Error al registrar usuario.' });
  }
});



app.use('/api', router);

