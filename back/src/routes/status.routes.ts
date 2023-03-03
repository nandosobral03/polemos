import { Router } from "express";
import { createStatus, deleteStatus, editStatus, getStatuses } from "../controller/status.controller";
import { verifyStructure } from "../middlewares/checkStructure.middleware";
import { isStatus } from "../models/status.model";
const router = Router();

router.get("/", getStatuses);
router.post("/", verifyStructure(isStatus), createStatus);
router.delete("/:id", deleteStatus);
router.put("/:id", verifyStructure(isStatus), editStatus);



export default router;