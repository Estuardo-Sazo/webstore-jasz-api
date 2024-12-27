import sequelize from "../config/connection.js";

export const crearCategoria = async (req, res) => {
  const { nombre, descripcion, imagen } = req.body;
  try {
    await sequelize.query(
      "Exec CrearCategoria @nombre = :nombre, @descripcion = :descripcion, @imagen = :imagen",
      {
        replacements: { nombre, descripcion, imagen },
      }
    );
    res.json({ message: "Categoría creada exitosamente" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al crear la categoría" });
  }
};

export const actualizarCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, imagen } = req.body;
  try {
    await sequelize.query(
      "Exec ActualizarCategoria @id = :id, @nombre = :nombre, @descripcion = :descripcion, @imagen = :imagen",
      {
        replacements: { id, nombre, descripcion, imagen },
      }
    );
    res.json({ message: "Categoría actualizada exitosamente" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al actualizar la categoría" });
  }
};

export const eliminarCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    await sequelize.query(
      "Exec EliminarCategoria @id = :id",
      {
        replacements: { id },
      }
    );
    res.json({ message: "Categoría eliminada exitosamente" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al eliminar la categoría" });
  }
};

export const obtenerCategorias = async (req, res) => {
  try {
    const [categorias] = await sequelize.query("SELECT * FROM vw_CategoriasActivas");
    res.json(categorias);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al obtener las categorías" });
  }
};