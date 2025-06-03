// 1. Importar express
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors()); // 🔓 Habilita CORS para cualquier origen


// 2. Middleware para leer JSON
app.use(express.json());

// 2.5. .env extension
require('dotenv').config();

// 3. Ruta de prueba
app.get('/usuarios', (req, res) => {
  res.json([
    { contraseña: 1234, usuario: 'Angel' },
    { contraseña: 2468, usuario: 'Darlin' }
  ]);
});

// 4. Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
