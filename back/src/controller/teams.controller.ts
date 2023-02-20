import { Request, Response } from 'express';
import { getAuthUser } from '../utils';
import repo from '../repository/teams.repository';

export const getTeams = async (req: Request, res: Response) => {
    const user = getAuthUser(req);
    const teams = await repo.getTeams(user);
    res.status(200).json(teams);
}

export const createTeam = async (req: Request, res: Response) => {
    const user = getAuthUser(req);
    const team = await repo.createTeam(user, req.body);
    res.status(200).json({
        message: "Team created",
        team
    });    
}

export const updateTeam = async (req: Request, res: Response) => {
    const user = getAuthUser(req);
    await repo.updateTeam(user, req.params.id, req.body);
    res.status(200).json({
        message: "Team updated",
    });
}

export const deleteTeam = async (req: Request, res: Response) => {
    const user = getAuthUser(req);
    await repo.deleteTeam(user, req.params.id);
    res.status(200).json({
        message: "Team deleted",
    });
}