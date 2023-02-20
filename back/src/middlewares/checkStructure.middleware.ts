import { Request,Response,NextFunction } from "express";
import * as jwt from 'jsonwebtoken';

export const verifyStructure = (checkerFunction: (arg0: any) => {correct: boolean, structure:any}) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const {correct, structure} = checkerFunction(req.body);
        if (!correct) {
            res.status(400).send({ message: "Invalid structure", required: structure });
        } else {
            next();
        }
    }   
}

