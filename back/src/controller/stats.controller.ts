import { Request, Response } from 'express';
import repo from '../repository/stats.repository';
import { formatHttpError, getAuthUser } from '../utils';



export const getStats = async (req: Request, res: Response) => {
    try{
    const userId = getAuthUser(req);
    const stats = await repo.getStats(userId);
    res.status(200).json(stats);
    }
    catch(err){
        const error = formatHttpError(err);
        res.status(error.status).send(error.message);
    }
}

export const resetStats = async (req: Request, res: Response) => {
    try{
    const userId = getAuthUser(req);
    await repo.resetStats(userId);
    res.status(200).json({ message: 'Stats reset' });
    }
    catch(err){
        const error = formatHttpError(err);
        res.status(error.status).send(error.message);
    }
}