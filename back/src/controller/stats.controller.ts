import { Request, Response } from 'express';
import repo from '../repository/stats.repository';
import { getAuthUser } from '../utils';



export const getStats = async (req: Request, res: Response) => {
    const userId = getAuthUser(req);
    const stats = await repo.getStats(userId);
    res.status(200).json(stats);
}

export const resetStats = async (req: Request, res: Response) => {
    const userId = getAuthUser(req);
    await repo.resetStats(userId);
    res.status(200).json({ message: 'Stats reset' });
}