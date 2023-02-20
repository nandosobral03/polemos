import { Request, Response } from 'express';
import { getAuthUser } from '../utils';
import repo from '../repository/sponsor.repository';


export const getSponsors = async (req: Request, res: Response) => {
    const  user = getAuthUser(req);
    const  sponsors = await repo.getSponsors(user);
    res.status(200).json(sponsors);
}

export const createSponsor = async (req: Request, res: Response) => {
    const  user = getAuthUser(req);
    const  sponsor = await repo.createSponsor(user, req.body.name);
    res.status(200).json({
        message: "Sponsor created",
        sponsor
    });
}

export const deleteSponsor = async (req: Request, res: Response) => {
    const  user = getAuthUser(req);
    await repo.deleteSponsor(user, req.params.id);
    res.status(200).json({
        message: "Sponsor deleted",
    });
}   