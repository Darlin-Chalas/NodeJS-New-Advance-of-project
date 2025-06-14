// =======================
// 1. IMPORTACIONES Y CONFIGURACIÓN INICIAL
// =======================
const express = require('express');
const cors = require('cors');
const { sql, poolPromise } = require('./Config/DB');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =======================
// 2. INICIAR SERVIDOR
// =======================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// =======================
// 3. RUTAS DE CONSULTA (GET)
// =======================

// Usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT correo, contraseña FROM Usuarios');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al conectar con Azure SQL:', err);
    res.status(500).send('Error al obtener usuarios');
  }
});

// Clientes
app.get('/clientes', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT id_cliente, correo, nombre, telefono FROM Clientes');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al conectar con Azure SQL:', err);
    res.status(500).send('Error al obtener clientes');
  }
});

// Obtener nombre de cliente por correo
app.get('/cliente_nombre', async (req, res) => {
  try {
    const { correo } = req.query;
    const pool = await poolPromise;
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

// Políticas, términos y contacto
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

// Obtener todas las solicitudes (temporal)
const solicitudes = [];
app.get('/solicitud_servicio', (req, res) => {
  if (solicitudes.length === 0) {
    res.json({ message: 'No hay solicitudes disponibles.' });
  } else {
    res.json({ solicitudes });
  }
});

// Obtener el último id_vehiculo
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

// =======================
// 4. RUTAS DE REGISTRO (POST)
// =======================

// Registrar solicitud de servicio (vehículo)
app.post('/registrar_solicitud', async (req, res) => {
  try {
    const {
      id_cliente,
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

    res.json({ message: 'Vehiculo guardado correctamente' });
  } catch (err) {
    console.error('Error al guardar el vehiculo:', err);
    res.status(500).send('Error al guardar vehiculo');
  }
});

// Registrar observaciones OJOOOO En esta parte tenemos que trabajar que el codigo envie
// todos los datos a la tabla OrdenesDeServicio, no podemos enviar solo las observaciones
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

// Registrar inventario OJJOOO Esta parte es un segmento del post que esta arriba
app.post('/registrar_inventario', async (req, res) => {
  try {
    const { id_cliente, inventario } = req.body;
    if (!id_cliente || !inventario) {
      return res.status(400).json({ error: 'Datos inválidos.' });
    }
    const pool = await poolPromise;
    await pool.request()
      .input('id_cliente', sql.Int, id_cliente)
      .input('inventario', sql.VarChar(50), inventario)
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

// =======================
// 5. RUTAS DE USUARIOS (API)
// =======================
const router = express.Router();

// Registrar usuario
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

