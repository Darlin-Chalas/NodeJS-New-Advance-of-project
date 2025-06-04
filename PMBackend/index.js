// 1. Importar express
const express = require('express');
const { sql, poolPromise } = require('./Config/DB'); // Usa tu módulo de conexión
const cors = require('cors');
const app = express();
app.use(cors()); // 🔓 Habilita CORS para cualquier origen



// 2. Middleware para leer JSON
app.use(express.json());

// 2.5. .env extension
require('dotenv').config();

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
