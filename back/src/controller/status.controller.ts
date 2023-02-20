import { Request, Response } from "express";
import { formatHttpError, getAuthUser } from "../utils";
import repo from "../repository/status.repository";

export const getStatuses = async (req: Request, res: Response) => {
  try {
    const user = getAuthUser(req);
    const sponsors = await repo.getStatuses(user);
    res.status(200).json(sponsors);
  } catch (err) {
    const error = formatHttpError(err);
    res.status(error.status).send(error.message);
  }
};

export const createStatus = async (req: Request, res: Response) => {
  try {
    const user = getAuthUser(req);
    const status = await repo.createStatus(user, req.body);
    res.status(200).json(status);
  } catch (err) {
    const error = formatHttpError(err);
    res.status(error.status).send(error.message);
  }
};

export const deleteStatus = async (req: Request, res: Response) => {
  try {
    const user = getAuthUser(req);
    await repo.deleteStatus(user, req.params.id);
    res.status(200).json({
      message: "Status deleted",
    });
  } catch (err) {
    const error = formatHttpError(err);
    res.status(error.status).send(error.message);
  }
};
