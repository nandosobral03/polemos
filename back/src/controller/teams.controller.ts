import { Request, Response } from 'express';
import { formatHttpError, getAuthUser } from '../utils';
import repo from '../repository/teams.repository';

export const getTeams = async (req: Request, res: Response) => {
    try{
    const user = getAuthUser(req);
    const teams = await repo.getTeams(user);
    res.status(200).json(teams);
        }
        catch(err) {
            const error = formatHttpError(err);
            res.status(error.status).send(error.message);
        }  

}

export const createTeam = async (req: Request, res: Response) => {
    try{
    const user = getAuthUser(req);
    const team = await repo.createTeam(user, req.body);
    res.status(200).json({
        message: "Team created",
        team
    });    
    }
    catch(err) {
        const error = formatHttpError(err);
        res.status(error.status).send(error.message);
    }  

}

export const updateTeam = async (req: Request, res: Response) => {
    try{
    const user = getAuthUser(req);
    await repo.updateTeam(user, req.params.id, req.body);
    res.status(200).json({
        message: "Team updated",
    });
    }
    catch(err) {
        const error = formatHttpError(err);
        res.status(error.status).send(error.message);
    }  

}

export const deleteTeam = async (req: Request, res: Response) => {
    try{
    const user = getAuthUser(req);
    await repo.deleteTeam(user, req.params.id);
    res.status(200).json({
        message: "Team deleted",
    });
    }
    catch(err) {
        const error = formatHttpError(err);
        res.status(error.status).send(error.message);
    }  

}