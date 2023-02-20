import { Router } from "express";
import { verifyStructure } from "../middlewares/checkStructure.middleware";
import { isEvent } from "../models/events.model";
import { createEvent, deleteEvent, getEvents, updateEvent } from "../controller/events.controller";
const router = Router();

router.post("/", verifyStructure(isEvent), createEvent);
router.get("/", getEvents);
router.delete("/:id", deleteEvent);
router.put("/:id", verifyStructure(isEvent), updateEvent);



export default router;