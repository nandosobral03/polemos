import { Router } from "express";
import { createUser, deleteUser } from "../controller/user.controller";


const checkAuth = (req: any, res: any, next: any) => {
      
        const token = req.headers.authorization === process.env.ADMIN_KEY;
        if (token) {
            next();
        } else {
            res.status(401).json({ message: "Not authorized" });
        }
    }

const router = Router();

router.post("/",checkAuth, createUser);
router.delete("/:id",checkAuth, deleteUser);




export default router;