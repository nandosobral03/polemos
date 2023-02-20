import { Request, Response } from "express";
import { getAuthUser } from "../utils";
import repo from "../repository/game.repository";

export const startGame = async (req: Request, res: Response) => {
    const user = getAuthUser(req);
    const game = await repo.startGame(user);
    res.status(200).json(game);
}

export const getDay = async (req: Request, res: Response) => {
    const user = getAuthUser(req);
    const day = await repo.getDay(user, req.params.id, req.params.day);
    res.status(200).json(day);
}