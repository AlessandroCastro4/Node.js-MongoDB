// app.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/productosDB')
  .then(() => console.log('🟢 Conectado a MongoDB'))
  .catch((err) => console.error('🔴 Error al conectar a MongoDB:', err));

// Modelo
const Producto = mongoose.model('Producto', {
  nombre: String,
  precio: Number,
  descripcion: String
});

// Rutas CRUD
app.get('/productos', async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
});

app.post('/productos', async (req, res) => {
  const nuevoProducto = new Producto(req.body);
  const resultado = await nuevoProducto.save();
  res.json(resultado);
});

app.put('/productos/:id', async (req, res) => {
  const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(productoActualizado);
});

app.delete('/productos/:id', async (req, res) => {
  await Producto.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Producto eliminado' });
});

app.listen(port, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${port}`);
});
