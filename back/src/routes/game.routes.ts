import { Router } from "express";
import { verifyStructure } from "../middlewares/checkStructure.middleware";
import { getDay, startGame } from "../controller/game.controller";
const router = Router();

router.post("/", startGame);
router.get("/:id/day/:day", getDay);




export default router;