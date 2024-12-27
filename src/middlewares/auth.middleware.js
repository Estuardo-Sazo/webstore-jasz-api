
import jwt from 'jsonwebtoken';
import "dotenv/config";

const jwtSecret = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Error! No Autorizado' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'No se pudo validar el token' });
    }

    req.userId = decoded.id;
    next();
  });
};