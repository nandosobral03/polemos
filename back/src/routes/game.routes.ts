import { Router } from "express";
import { startGame, getDay, getGameInfo, getGames } from "../controller/game.controller";
const router = Router();

router.post("/", startGame);
router.get("/:id/day/:day", getDay);
router.get("/:id", getGameInfo);
router.get("/", getGames);

export default router;