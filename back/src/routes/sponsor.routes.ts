import { Router } from "express";
import { getSponsors, createSponsor, deleteSponsor,updateSponsor } from "../controller/sponsor.controller";
import { verifyStructure } from "../middlewares/checkStructure.middleware";
import { isSponsor } from "../models/sponsor.model";
const router = Router();

router.get("/", getSponsors);
router.post("/", verifyStructure(isSponsor), createSponsor);
router.delete("/:id", deleteSponsor);
router.put("/:id", verifyStructure(isSponsor), updateSponsor);

export default router;