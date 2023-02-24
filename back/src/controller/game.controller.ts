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


export const getGames = async (req: Request, res: Response) => {
  try {
    const user = getAuthUser(req);
    const games = await repo.getGames(user);
    res.status(200).json(games);
  } catch (err) {
    const error = formatHttpError(err);
    res.status(error.status).send(error.message);
  }
}

export const getGameInfo = async (req: Request, res: Response) => {
  try{
    const user = getAuthUser(req);
    const game = await repo.getGameInfo(req.params.id, user);
    res.status(200).json(game);
  } catch (err) {
    const error = formatHttpError(err);
    res.status(error.status).send(error.message);
  }
}

export const getGameSummary = async (req: Request, res: Response) => {
  try{
    const user = getAuthUser(req);
    const summary = await repo.getGameSummary(req.params.id,user);
    res.status(200).json(summary);
  } catch (err) {
    const error = formatHttpError(err);
    res.status(error.status).send(error.message);
  }
}

export const getPlayerStory = async (req: Request, res: Response) => {
  try{
    const user = getAuthUser(req);
    const story = await repo.getPlayerStory(req.params.id, req.params.playerId, user);
    res.status(200).json(story);
  } catch (err) {
    const error = formatHttpError(err);
    res.status(error.status).send(error.message);
  }
}