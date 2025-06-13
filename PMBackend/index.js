// 1. Importar express
const express = require('express');
const cors = require('cors');
const { sql, poolPromise } = require('./Config/DB'); // Usa tu módulo de conexión
const { VarChar } = require('mssql');
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
    const result = await pool.request().query('SELECT id_cliente, correo, nombre, telefono FROM Clientes');
    //console.log('Datos de clientes:', result.recordset); // Para depuración
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al conectar con Azure SQL:', err);
    res.status(500).send('Error al obtener clientes');
  }
});

app.get('/cliente_nombre', async (req, res) => {
  try {
    const { correo } = req.query; // Obtiene el ID del cliente desde la query string
    const pool = await poolPromise; // Usa la conexión centralizada
    const result = await pool.request()
      .input('correo', sql.VarChar(100), correo)
      .query('SELECT nombre FROM Clientes WHERE correo = @correo');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado.' });
    }
    
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error al obtener cliente por correo:', err);
    res.status(500).send('Error al obtener cliente por correo');
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
app.post('/registrar_solicitud', async (req, res) => {
  try {
    const {
      id_cliente, // este debe venir del frontend
      Marca, Modelo, Color, Kilometraje, Placas, NumeroDeSerie
    } = req.body;

    const pool = await poolPromise;
    await pool.request()
      .input('id_cliente', id_cliente)
      .input('Marca', Marca)
      .input('Modelo', Modelo)
      .input('Color', Color)
      .input('Kilometraje', Kilometraje)
      .input('Placas', Placas)
      .input('NumeroDeSerie', NumeroDeSerie)
      .input('Fecha_Registro', sql.DateTime, new Date())
      .query(`
        INSERT INTO Vehiculos (
          id_cliente, marca, modelo, color, kilometraje, placa, numero_serie, fecha_registro)
          VALUES (
          @id_cliente, @Marca, @Modelo, @Color, @Kilometraje, @Placas, @NumeroDeSerie, @Fecha_Registro
        )
      `);

      //para las imagenes de obervaciones
      //imagenes_observaciones (el campo de la base de datos)
      //.input('imagenes_observaciones', sql.VarChar(sql.MAX), JSON.stringify(imagenes_observaciones)) (asi seria en la petición de inserción)

    res.json({ message: 'Vehiculo guardado correctamente' });
  } catch (err) {
    console.error('Error al guardar el vehiculo:', err);
    res.status(500).send('Error al guardar vehiculo');
  }
});



// POST: Recibe y guarda las imagenes de observaciones
app.post('/registrar_observaciones', async (req, res) => {
  try {
    const { id_cliente, observaciones } = req.body;

    if (!id_cliente || !observaciones) {
      return res.status(400).json({ error: 'Datos inválidos.' });
    }

    const pool = await poolPromise;
    await pool.request()
      .input('id_cliente', sql.Int, id_cliente)
      .input('observaciones', sql.VarChar(sql.MAX), observaciones)
      .query(`
        INSERT INTO OrdenesDeServicio (id_cliente, observaciones)
        VALUES (@id_cliente, @observaciones)
      `);

    res.json({ message: 'Observaciones guardadas correctamente.' });
  } catch (err) {
    console.error('Error al guardar las observaciones:', err);
    res.status(500).send('Error al guardar las observaciones');
  }
});

//POST: Recibe y guarda los checkboxes de inventario
app.post('/registrar_inventario', async (req, res) => {
  try {
    const { id_cliente, inventario } = req.body;

    if (!id_cliente || !inventario) {
      return res.status(400).json({ error: 'Datos inválidos.' });
    }

    const pool = await poolPromise;
    await pool.request()
      .input('id_cliente', sql.Int, id_cliente)
      .input('inventario', sql.VarChar(50), req.body.inventario)
      .query(`
        INSERT INTO OrdenesDeServicio (id_cliente, inventario)
        VALUES (@id_cliente, @inventario)
      `);

    res.json({ message: 'Inventario guardado correctamente.' });
  } catch (err) {
    console.error('Error al guardar el inventario:', err);
    res.status(500).send('Error al guardar el inventario');
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

//Ruta para obtener el id del vehiculo
app.get('/vehiculo_id', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('SELECT TOP 1 id_vehiculo FROM Vehiculos ORDER BY id_vehiculo DESC');
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'Vehículo no encontrado.' });
    }
    res.json(result.recordset[0]);
  } catch (err) {
    console.error('Error al obtener el id del vehículo:', err);
    res.status(500).send('Error al obtener el id del vehículo');
  }
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
    if (!contraseña || !id_cliente) {
      return res.status(400).json({ error: 'Faltan datos obligatorios.' });
    }
    const pool = await poolPromise;
    await pool.request()
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

