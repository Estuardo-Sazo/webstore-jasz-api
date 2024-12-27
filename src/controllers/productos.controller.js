import sequelize from "../config/connection.js";

export const crearProducto = async (req, res) => {
  const {
    nombre,
    marca,
    precio,
    descuento,
    codigo,
    stock,
    id_categoria,
    id_usuario,
    id_estado,
    imagenes,
  } = req.body;
  try {
    await sequelize.query(
      "Exec CrearProducto @nombre = :nombre, @marca = :marca, @precio = :precio, @descuento = :descuento, @codigo = :codigo, @stock = :stock, @id_categoria = :id_categoria, @id_usuario = :id_usuario, @id_estado = :id_estado, @imagenes = :imagenes",
      {
        replacements: {
          nombre,
          marca,
          precio,
          descuento,
          codigo,
          stock,
          id_categoria,
          id_usuario,
          id_estado,
          imagenes,
        },
      }
    );
    res.json({ message: "Producto creado exitosamente" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al crear el producto" });
  }
};

export const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    marca,
    precio,
    descuento,
    codigo,
    stock,
    id_categoria,
    id_usuario,
    id_estado,
    imagenes,
  } = req.body;
  try {
    await sequelize.query(
      "Exec ActualizarProducto @id = :id, @nombre = :nombre, @marca = :marca, @precio = :precio, @descuento = :descuento, @codigo = :codigo, @stock = :stock, @id_categoria = :id_categoria, @id_usuario = :id_usuario, @id_estado = :id_estado, @imagenes = :imagenes",
      {
        replacements: {
          id,
          nombre,
          marca,
          precio,
          descuento,
          codigo,
          stock,
          id_categoria,
          id_usuario,
          id_estado,
          imagenes,
        },
      }
    );
    res.json({ message: "Producto actualizado exitosamente" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

export const eliminarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    await sequelize.query("Exec EliminarProducto @id = :id", {
      replacements: { id },
    });
    res.json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};

export const obtenerProductos = async (req, res) => {
  try {
    const [productos] = await sequelize.query(
      "SELECT * FROM vw_ProductosActivos"
    );
    res.json(productos);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};

export const ObtenerProductosPaginados = async (req, res) => {
  const { pagina, cantidad } = req.params;
  try {
    const [productos] = await sequelize.query(
      "Exec ObtenerProductosPaginados @NumeroPagina = :pagina, @sizePagina = :cantidad",
      {
        replacements: { pagina, cantidad },
      }
    );
    res.json(productos);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};

export const ObtenerProductoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const [producto] = await sequelize.query(
      "SELECT * FROM vw_ProductosActivos WHERE id = :id",
      {
        replacements: { id },
      }
    );
    res.json(producto);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al obtener el producto" });
  }
};

export const ObtenerProductosPorCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const [productos] = await sequelize.query(
      "SELECT * FROM vw_ProductosActivos WHERE id_categoria = :id",
      {
        replacements: { id },
      }
    );
    res.json(productos);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};

export const ProductosActivosConStockMayorACero = async (req, res) => {
  try {
    const [productos] = await sequelize.query(
      "SELECT * FROM vw_ProductosActivosConStockMayorA0"
    );
    res.json(productos);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};
