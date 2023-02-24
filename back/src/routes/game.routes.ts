import { Router } from "express";
import { startGame, getDay, getGameInfo, getGames, getGameSummary, getPlayerStory } from "../controller/game.controller";
const router = Router();

router.post("/", startGame);
router.get("/:id/day/:day", getDay);
router.get("/:id", getGameInfo);
router.get("/", getGames);
router.get("/:id/summary", getGameSummary);
router.get('/:id/player/:playerId', getPlayerStory);

export default router;