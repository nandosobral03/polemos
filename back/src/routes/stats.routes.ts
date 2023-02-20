import { Router } from "express";
import { getStats, resetStats } from "../controller/stats.controller";
const router = Router();

router.get("/", getStats);
router.post("/reset", resetStats);




export default router;