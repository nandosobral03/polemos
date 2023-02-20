import { getAuthUser } from "../utils";
import repo from "../repository/events.repository";
import { Request, Response } from "express";

export const createEvent = async (req: Request, res: Response) => {
    const user = getAuthUser(req);
    const event = await repo.createEvent(user, req.body);
    res.status(200).json(event);
}

export const getEvents = async (req: Request, res: Response) => {
    const user = getAuthUser(req);
    const events = await repo.getEvents(user);
    res.status(200).json(events);
}

export const deleteEvent = async (req: Request, res: Response) => {
    const user = getAuthUser(req);
    await repo.deleteEvent(user, req.params.id);
    res.status(200).json({
        message: "Event deleted",
    });
}

export const updateEvent = async (req: Request, res: Response) => {
    const user = getAuthUser(req);
    await repo.updateEvent(user, req.params.id, req.body);
    res.status(200).json({
        message: "Event updated",
    });
}


