import { Router } from "express";
import { createTeam, deleteTeam, getTeams, updateTeam } from "../controller/teams.controller";
import { verifyStructure } from "../middlewares/checkStructure.middleware";
import { isTeam } from "../models/teams.model";

const router = Router();

router.get("/", getTeams);
router.post("/", verifyStructure(isTeam), createTeam);
router.put("/:id", verifyStructure(isTeam), updateTeam);
router.delete("/:id", deleteTeam);


export default router;