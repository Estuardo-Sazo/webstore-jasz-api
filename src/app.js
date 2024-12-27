import express from "express";

import categoriasRouter from "./routes/category.route.js";
import rolesRouter from "./routes/roles.route.js";
import estadosRouter from "./routes/estados.router.js";
import clientesRouter from "./routes/clientes.route.js";
import usuariosRouter from "./routes/usuarios.route.js";
import productosRouter from "./routes/productos.route.js";
import orderRouter from "./routes/order.route.js";
import authRouter from "./routes/auth.route.js";
import { verifyToken } from "./middlewares/auth.middleware.js";

const app = express();

app.use(express.json());

app.use("/categorias", categoriasRouter);
app.use("/roles", verifyToken, rolesRouter);
app.use("/estados", estadosRouter);
app.use("/clientes", clientesRouter);
app.use("/usuarios", verifyToken, usuariosRouter);
app.use("/productos", productosRouter);
app.use("/orders", verifyToken, orderRouter);
app.use("/auth", authRouter);

export default app;
