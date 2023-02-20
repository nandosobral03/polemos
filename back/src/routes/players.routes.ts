import { Router } from "express";
import { addPlayer, deletePlayer, updatePlayer, updatePlayerImage } from "../controller/players.controller";
import { verifyStructure } from "../middlewares/checkStructure.middleware";
import { isPlayer } from "../models/teams.model";
const router = Router();

router.post("/team/:teamId", verifyStructure(isPlayer), addPlayer);
router.delete("/:id", deletePlayer);
router.put("/:id", verifyStructure(isPlayer), updatePlayer);
router.put("/image/:id", updatePlayerImage);



export default router;