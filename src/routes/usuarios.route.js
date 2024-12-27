import { Router } from "express";

import * as usuarioController from "../controllers/usuarios.controller.js";

const router = Router();

router.post("/", usuarioController.crearUsuario);

router.put("/:id", usuarioController.actualizarUsuario);

router.delete("/:id", usuarioController.eliminarUsuario);

router.get("/", usuarioController.obtenerUsuarios);

router.get("/:id", usuarioController.obtenerUsuario);

export default router;
