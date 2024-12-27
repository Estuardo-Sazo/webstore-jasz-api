import 'dotenv/config'
import sequelize from './config/connection.js';
import app from "./app.js";

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
    app.listen(PORT, () => console.log(`Servidor ejecutándose en el puerto ${PORT}`));
  })
  .catch((error) => console.error('Error al conectar a la base de datos:', error));