import { Request, Response } from 'express';
import { formatHttpError, getAuthUser } from '../utils';
import repo from '../repository/sponsor.repository';


export const getSponsors = async (req: Request, res: Response) => {
    try{
        const  user = getAuthUser(req);
        const  sponsors = await repo.getSponsors(user);
        res.status(200).json(sponsors);
    }
    catch(err){
        const error = formatHttpError(err);
        res.status(error.status).send(error.message);
    }
}

export const createSponsor = async (req: Request, res: Response) => {
    const  user = getAuthUser(req);
    try{
        const  sponsor = await repo.createSponsor(user, req.body.name);
        res.status(200).json({
            message: "Sponsor created",
            sponsor
        });
    }
    catch(err){
        const error = formatHttpError(err);
        res.status(error.status).send(error.message);
    }
}

export const deleteSponsor = async (req: Request, res: Response) => {
    try{
        const  user = getAuthUser(req);
        await repo.deleteSponsor(user, req.params.id);
        res.status(200).json({
            message: "Sponsor deleted",
        });
    }
    catch(err){
        const error = formatHttpError(err);
        res.status(error.status).send(error.message);
    }
}   