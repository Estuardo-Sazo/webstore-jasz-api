import bcrypt from 'bcrypt';

import sequelize from "../config/connection.js";

import "dotenv/config";

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;
const expiracionToken = process.env.TOKEN_EXPIRES;
export const crearUsuario = async (req, res) => {
  const {
    nombre_completo,
    telefono,
    email,
    password,
    id_rol,
    id_stado,
    fecha_nacimiento,
    idCliente,
  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await sequelize.query(
      "Exec CrearUsuario @nombre_completo = :nombre_completo, @telefono = :telefono, @email = :email, @password = :hashedPassword, @id_rol = :id_rol, @id_stado = :id_stado, @fecha_nacimiento = :fecha_nacimiento, @idCliente = :idCliente",
      {
        replacements: {
          nombre_completo,
          telefono,
          email,
          hashedPassword,
          id_rol,
          id_stado,
          fecha_nacimiento,
          idCliente,
        },
      }
    );
    res.json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

export const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const {
    nombre_completo,
    telefono,
    email,
    password,
    id_rol,
    id_stado,
    fecha_nacimiento,
    idCliente,
  } = req.body;
  try {
    await sequelize.query(
      "Exec ActualizarUsuario @id = :id, @nombre_completo = :nombre_completo, @telefono = :telefono, @email = :email, @password = :password, @id_rol = :id_rol, @id_stado = :id_stado, @fecha_nacimiento = :fecha_nacimiento, @idCliente = :idCliente",
      {
        replacements: {
          id,
          nombre_completo,
          telefono,
          email,
          password,
          id_rol,
          id_stado,
          fecha_nacimiento,
          idCliente,
        },
      }
    );
    res.json({ message: "Usuario actualizado exitosamente" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};

export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await sequelize.query("Exec EliminarUsuario @id = :id", {
      replacements: { id },
    });
    res.json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
};

export const obtenerUsuarios = async (req, res) => {
  try {
    const [usuarios] = await sequelize.query(
      "SELECT * FROM vw_UsuariosActivos"
    );
    res.json(usuarios);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

export const obtenerUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const [usuarios] = await sequelize.query(
      "SELECT * FROM vw_UsuariosActivos",
      {
        replacements: { id },
      }
    );
    res.json(usuarios);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
};


export const iniciarSesion = async (req, res) => {

  const { email, password } = req.body;

  try {
    const [usuario] = await sequelize.query(
      "Exec ObtenerUsuarioPorEmail @email = :email",
      {
        replacements: { email },
      }
    );

    if (usuario && usuario[0]) {
      const match = await bcrypt.compare(password, usuario[0].password);
      if (match) {
        const token = jwt.sign(
          { id: usuario[0].id, email: usuario[0].email },
          jwtSecret,
          { expiresIn: expiracionToken }
        );
        res.json({ token });
      } else {
        res.status(401).json({ message: "Credenciales incorrectas" });
      }
    } else {
      res.status(401).json({ message: "Credenciales incorrectas" });
    }

    
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
}

