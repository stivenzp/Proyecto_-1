const express = require('express');
const cors = require('cors'); // 🔥 Importa CORS
const { getConnection } = require("./db/connect-mongo");

const app = express();
const port = 4000;

getConnection();

app.use(cors()); // 🔥 Habilita CORS para TODAS las solicitudes
app.use(express.json());

app.use('/usuario', require('./routes/usuario'));
app.use('/director', require('./routes/director'));
app.use('/genero', require('./routes/genero'));
app.use('/media', require('./routes/media'));
app.use('/productora', require('./routes/productora'));
app.use('/tipo', require('./routes/tipo'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

