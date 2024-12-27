import { Router } from "express";

import * as productosController from "../controllers/productos.controller.js";

const router = Router();

router.get("/", productosController.obtenerProductos);

router.post("/", productosController.crearProducto);

router.put("/:id", productosController.actualizarProducto);

router.delete("/:id", productosController.eliminarProducto);

router.get ("/stock", productosController.ProductosActivosConStockMayorACero);

router.get("/:id", productosController.ObtenerProductoPorId);

router.get("/categoria/:id", productosController.ObtenerProductosPorCategoria);

router.get("/paginado/:pagina/:cantidad", productosController.ObtenerProductosPaginados);

export default router;
