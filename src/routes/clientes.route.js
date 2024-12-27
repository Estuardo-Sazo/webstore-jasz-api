import { Router } from "express";

import * as clientesController from "../controllers/clientes.controller.js";

const router = Router();

router.get("/", clientesController.obtenerClientes);

router.post("/", clientesController.crearCliente);

router.put("/:id", clientesController.actualizarCliente);

router.delete("/:id", clientesController.eliminarCliente);

export default router;