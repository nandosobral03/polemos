import { Router } from "express";
import { startGame, getDay, getGameInfo, getGames, getGameSummary, getPlayerStory, getGamePlayers } from "../controller/game.controller";
const router = Router();

router.post("/", startGame);
router.get("/:id/day/:day", getDay);
router.get("/:id", getGameInfo);
router.get("/", getGames);
router.get("/:id/summary", getGameSummary);
router.get('/:id/player/:playerId', getPlayerStory);
router.get('/:id/player', getGamePlayers);

export default router;