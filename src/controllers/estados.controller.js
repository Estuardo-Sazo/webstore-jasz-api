import sequelize from "../config/connection.js";

export const crearEstado = async (req, res) => {
  const { nombre } = req.body;
  try {
    await sequelize.query("Exec CrearEstado @nombre = :nombre", {
      replacements: { nombre },
    });
    res.json({ message: "Estado creado exitosamente" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al crear el estado" });
  }
};

export const actualizarEstado = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    await sequelize.query("Exec ActualizarEstado @id = :id, @nombre = :nombre", {
      replacements: { id, nombre },
    });
    res.json({ message: "Estado actualizado exitosamente" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al actualizar el estado" });
  }
};

export const eliminarEstado = async (req, res) => {
  const { id } = req.params;
  try {
    await sequelize.query("Exec EliminarEstado @id = :id", {
      replacements: { id },
    });
    res.json({ message: "Estado eliminado exitosamente" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al eliminar el estado" });
  }
};

export const obtenerEstados = async (req, res) => {
  try {
    const [estados] = await sequelize.query("SELECT * FROM vw_EstadosActivos");
    res.json(estados);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al obtener los estados" });
  }
};