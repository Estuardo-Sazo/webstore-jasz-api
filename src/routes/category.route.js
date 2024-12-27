import { Router } from "express";
import * as categoryController from "../controllers/category.controller.js";

const router = Router();

router.get("/", categoryController.obtenerCategorias);
router.post("/", categoryController.crearCategoria);
router.put("/:id", categoryController.actualizarCategoria);
router.delete("/:id", categoryController.eliminarCategoria);

export default router;
