import { formatHttpError, getAuthUser } from "../utils";
import repo from "../repository/events.repository";
import { Request, Response } from "express";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const user = getAuthUser(req);
    const event = await repo.createEvent(user, req.body);
    res.status(200).json(event);
  } catch (err) {
    const error = formatHttpError(err);
    res.status(error.status).send(error.message);
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const user = getAuthUser(req);
    const event = await repo.getEventById(user, req.params.id);
    res.status(200).json(event);
  } catch (err) {
    const error = formatHttpError(err);
  }
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const fullDetails = req.query.fullDetails === "true";
    const gameId = req.query.gameId ? req.query.gameId.toString() : undefined;
    const dayNumber = req.query.dayNumber ? parseInt(req.query.dayNumber.toString()) : undefined;
    const user = getAuthUser(req);
    const events = await repo.getEvents(user, fullDetails, gameId, dayNumber);
    res.status(200).json(events);
  } catch (err) {
    const error = formatHttpError(err);
    res.status(error.status).send(error.message);
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const user = getAuthUser(req);
    await repo.deleteEvent(user, req.params.id);
    res.status(200).json({
      message: "Event deleted",
    });
  } catch (err) {
    const error = formatHttpError(err);
    res.status(error.status).send(error.message);
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const user = getAuthUser(req);
    await repo.updateEvent(user, req.params.id, req.body);
    res.status(200).json({
      message: "Event updated",
    });
  } catch (err) {
    const error = formatHttpError(err);
    res.status(error.status).send(error.message);
  }
};
