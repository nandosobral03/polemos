import { Router } from "express";
import { createPlayer, deletePlayer, updatePlayer, updatePlayerImage,getPlayers,getPlayer } from "../controller/players.controller";
import { verifyStructure } from "../middlewares/checkStructure.middleware";
import { isPlayer } from "../models/teams.model";
const router = Router();

router.post("/", verifyStructure(isPlayer), createPlayer);
router.delete("/:id", deletePlayer);
router.put("/:id", verifyStructure(isPlayer), updatePlayer);
router.put("/image/:id", updatePlayerImage);
router.get("/", getPlayers);
router.get("/:id", getPlayer);


export default router;