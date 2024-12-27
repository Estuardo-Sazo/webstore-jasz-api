import { Router } from "express";
import * as rolesController from "../controllers/roles.controller.js";

const router = Router();

router.get("/", rolesController.obtenerRoles);
router.post("/", rolesController.crearRol);
router.put("/:id", rolesController.actualizarRol);
router.delete("/:id", rolesController.eliminarRol);


export default router;

