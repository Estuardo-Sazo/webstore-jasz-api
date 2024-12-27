import sequelize from "../config/connection.js";

export const crearCliente = async (req, res) => {
  const { razon_social, nombre_comercial, email, telefono, direccion_entrega } =
    req.body;
  try {
    await sequelize.query(
      "Exec CrearCliente @razon_social = :razon_social, @nombre_comercial = :nombre_comercial, @email = :email, @telefono = :telefono, @direccion_entrega = :direccion_entrega",
      {
        replacements: {
          razon_social,
          nombre_comercial,
          email,
          telefono,
          direccion_entrega,
        },
      }
    );
    res.json({ message: "Cliente creado exitosamente" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al crear el cliente" });
  }
};

export const actualizarCliente = async (req, res) => {
  const { id } = req.params;
  const { razon_social, nombre_comercial, email, telefono, direccion_entrega } =
    req.body;
  try {
    await sequelize.query(
      "Exec ActualizarCliente @id = :id, @razon_social = :razon_social, @nombre_comercial = :nombre_comercial, @email = :email, @telefono = :telefono, @direccion_entrega = :direccion_entrega",
      {
        replacements: {
          id,
          razon_social,
          nombre_comercial,
          email,
          telefono,
          direccion_entrega,
        },
      }
    );
    res.json({ message: "Cliente actualizado exitosamente" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al actualizar el cliente" });
  }
};

export const eliminarCliente = async (req, res) => {
  const { id } = req.params;
  try {
    await sequelize.query("Exec EliminarCliente @id = :id", {
      replacements: { id },
    });
    res.json({ message: "Cliente eliminado exitosamente" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al eliminar el cliente" });
  }
};

export const obtenerClientes = async (req, res) => {
  try {
    const [clientes] = await sequelize.query("SELECT * FROM vw_ClientesActivos");
    res.json(clientes);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al obtener los clientes" });
  }
};

