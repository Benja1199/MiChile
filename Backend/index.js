const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Conexión a MongoDB (local)
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conexión exitosa a MongoDB en localhost"))
  .catch((error) => console.error("Error al conectar a MongoDB:", error));

// Definir el modelo de usuario con la colección específica "Usuarios"
const usuarioSchema = new mongoose.Schema(
  {
    User_id: { type: Number, required: true },
    Nombre: { type: String, required: true },
    Telefono: { type: String, required: true },
    Correo: { type: String, required: true },
  },
  { collection: "Usuarios" } // Fuerza el uso de la colección "Usuarios"
);

const ubicacionSchema = new mongoose.Schema(
    {
      Latitud: { type: Number, required: true },
      Longitud: { type: Number, required: true },
      Lugar: { type: String, required: true },
    },
    { collection: "Ubicaciones" } // Especifica la colección "Ubicaciones"
  );

const Usuario = mongoose.model("Usuario", usuarioSchema);
const Ubicacion = mongoose.model("Ubicacion", ubicacionSchema);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("¡Servidor funcionando correctamente!");
});

// Ruta para obtener todos los usuarios
app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await Usuario.find(); // Trae todos los usuarios
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener todas las ubicaciones
app.get("/ubicaciones", async (req, res) => {
    try {
      const ubicaciones = await Ubicacion.find(); // Trae todas las ubicaciones
      res.status(200).json(ubicaciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// Ruta para agregar un usuario
app.post("/usuarios", async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body); // Crear un nuevo usuario con el cuerpo de la solicitud
    const usuarioGuardado = await nuevoUsuario.save(); // Guardar en la base de datos
    res.status(201).json(usuarioGuardado); // Enviar respuesta
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
