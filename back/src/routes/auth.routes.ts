import { Router } from "express";
import { login } from "../controller/auth.controller";

const router = Router();

router.post("/", login);

export default router;