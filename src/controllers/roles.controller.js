import sequelize from "../config/connection.js";

export const crearRol = async (req, res) => {
  const { nombre } = req.body;
  try {
    await sequelize.query("Exec CrearRol @nombre = :nombre", {
      replacements: { nombre },
    });
    res.json({ message: "Rol creado exitosamente" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al crear el rol" });
  }
};

export const actualizarRol = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    await sequelize.query("Exec ActualizarRol @id = :id, @nombre = :nombre", {
      replacements: { id, nombre },
    });
    res.json({ message: "Rol actualizado exitosamente" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al actualizar el rol" });
  }
};

export const eliminarRol = async (req, res) => {
  const { id } = req.params;
  try {
    await sequelize.query("Exec EliminarRol @id = :id", {
      replacements: { id },
    });
    res.json({ message: "Rol eliminado exitosamente" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al eliminar el rol" });
  }
};

export const obtenerRoles = async (req, res) => {
  try {
    const [roles] = await sequelize.query("SELECT * FROM vw_RolesActivos");
    res.json(roles);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al obtener los roles" });
  }
};
