import { Router } from "express";
import {
  iniciarSesion,
  registroUsuario,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", iniciarSesion);
router.post("/register", registroUsuario);

export default router;
