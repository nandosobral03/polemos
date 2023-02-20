import { Request, Response } from "express";
import { formatHttpError, getAuthUser } from "../utils";
import repo from "../repository/game.repository";

export const startGame = async (req: Request, res: Response) => {
  try {
    const user = getAuthUser(req);
    const game = await repo.startGame(user);
    res.status(200).json(game);
  } catch (err) {
    const error = formatHttpError(err);
    res.status(error.status).send(error.message);
  }
};

export const getDay = async (req: Request, res: Response) => {
  try {
    const user = getAuthUser(req);
    const day = await repo.getDay(user, req.params.id, req.params.day);
    res.status(200).json(day);
  } catch (err) {
    const error = formatHttpError(err);
    res.status(error.status).send(error.message);
  }
};
