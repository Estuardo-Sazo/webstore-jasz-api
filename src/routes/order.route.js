import e, { Router } from "express";
import * as orderController from "../controllers/order.controller.js";

const router = Router();

router.post("/create", orderController.crearOrdenConLineas);
router.get("/list/user", orderController.ObtenerOrdenesLineasPorUsuario);

export default router;