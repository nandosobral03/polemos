import { Request, Response } from 'express';
import { formatHttpError, getAuthUser } from '../utils';
import repo from '../repository/players.repository';


export const createPlayer = async (req: Request, res: Response) => {
    try{
    const user = getAuthUser(req);
    const  player = await repo.createPlayer(req.body, user);
    res.status(200).json({
        message: "Player added",
        player
    });
    }
    catch(err){
        const error = formatHttpError(err);
        res.status(error.status).send(error.message);
    }
}

export const deletePlayer = async (req: Request, res: Response) => {
    try{
    const user = getAuthUser(req);  
    await repo.deletePlayer(req.params.id, user);
    res.status(200).json({
        message: "Player deleted",
    });
    }
    catch(err){
        const error = formatHttpError(err);
        res.status(error.status).send(error.message);
    }
}

export const updatePlayerImage = async (req: Request, res: Response) => {
    try{
    const user = getAuthUser(req);
    let { id } = req.params;
    if(!req.files){
        throw {
            status: 400,
            message: "Invalid file"
        }
    }
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
        res.status(400).send({message:"No files were uploaded"});
        return
    }
    let image = req.files.image as { data: Buffer, name: string, size: number, mimetype: string, md5: string };
    if(!image.mimetype.startsWith("image/")){
        throw {
            status: 400,
            message: "Invalid file"
        }
    }
   

    
    await repo.updatePlayerImage(id, image, user);
    res.status(200).json({
        message: "Player image updated",
    });
    }
    catch(err){
        const error = formatHttpError(err);
        res.status(error.status).send(error.message);
    }
}

export const updatePlayer = async (req: Request, res: Response) => {
    try{
    const user = getAuthUser(req);
    await repo.updatePlayer(req.params.id, req.body,user);
    res.status(200).json({
        message: "Player updated",
    });
    }
    catch(err){
        const error = formatHttpError(err);
        res.status(error.status).send(error.message);
    }
}

export const  getPlayers = async (req: Request, res: Response) => {
    try{
    const user = getAuthUser(req);
    const all = req.query.all === "true";
    const players = await repo.getPlayers(user, all);
    res.status(200).json(players);
    }
    catch(err){
        const error = formatHttpError(err);
        res.status(error.status).send(error.message);
    }
}

export const getPlayer = async (req: Request, res: Response) => {
    try{
    const user = getAuthUser(req);
    const player = await repo.getPlayer(req.params.id, user);
    res.status(200).json(player);
    }
    catch(err){
        const error = formatHttpError(err);
        res.status(error.status).send(error.message);
    }
}