import { Router } from "express";
import { createStatus, deleteStatus, getStatuses } from "../controller/status.controller";
import { verifyStructure } from "../middlewares/checkStructure.middleware";
import { isStatus } from "../models/status.model";
const router = Router();

router.get("/", getStatuses);
router.post("/", verifyStructure(isStatus), createStatus);
router.delete("/:id", deleteStatus);




export default router;