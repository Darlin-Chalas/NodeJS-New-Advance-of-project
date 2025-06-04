const sql = require("mssql");
require("dotenv").config();
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,               // Requerido por Azure
    trustServerCertificate: false // Cambiar a true si es necesario para desarrollo local
  }
};

// Crear una conexión a la base de datos
// y exportarla para su uso en otras partes de la aplicación
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("✅ Conectado a Azure SQL");
    return pool;
  })
  .catch(err => {
    console.error("❌ Error de conexión:", err);
  });

module.exports = {
  sql, poolPromise
};