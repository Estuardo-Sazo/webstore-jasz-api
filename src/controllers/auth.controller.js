import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sequelize from "../config/connection.js";
import "dotenv/config";

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;
const expiracionToken = process.env.TOKEN_EXPIRES;

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
        //enviar token y usuario sin password
        res.json({ token, usuario: { ...usuario[0], password: undefined } });

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
};

export const registroUsuario = async (req, res) => {
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
    const [usuario] = await sequelize.query(
      "Exec ObtenerUsuarioPorEmail @email = :email",
      {
        replacements: { email },
      }
    );
    if (usuario && usuario[0]) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }
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
