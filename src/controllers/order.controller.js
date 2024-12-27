import sequelize from "../config/connection.js";

export const crearOrdenConLineas = async (req, res) => {
  const {
    id_estado,
    nombre_completo,
    direccion,
    telefono,
    correo_electronico,
    fecha_entrega,
    total_orden,
    detalles,
  } = req.body;

  const id_usuario = req.userId;

  try {
    await sequelize.query(
      "Exec CrearOrdenConDetalles @id_estado = :id_estado, @id_usuario = :id_usuario, @nombre_completo = :nombre_completo, @direccion = :direccion, @telefono = :telefono, @correo_electronico = :correo_electronico, @fecha_entrega = :fecha_entrega, @total_orden = :total_orden, @detalles = :detalles",
      {
        replacements: {
          id_estado,
          id_usuario,
          nombre_completo,
          direccion,
          telefono,
          correo_electronico,
          fecha_entrega,
          total_orden,
          detalles: JSON.stringify(detalles),
        },
      }
    );
    res.json({ message: "Orden creada exitosamente" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al crear la orden" });
  }
};

export const ObtenerOrdenesLineasPorUsuario = async (req, res) => {
  const id = req.userId;

  try {
    const [ordenes] = await sequelize.query(
      "Exec ObtenerOrdenesLineasPorUsuario @id_usuario = :id",
      {
        replacements: { id },
      }
    );    
    if (ordenes && ordenes[0]) {
      const json = JSON.parse(
        ordenes[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
      );
      res.json(json);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al obtener las ordenes" });
  }
};
