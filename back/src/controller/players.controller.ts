import { Request, Response } from 'express';
import { compressImage } from '../utils';
import repo from '../repository/players.repository';
import path from 'path';
import fs from 'fs';


export const addPlayer = async (req: Request, res: Response) => {
    const { teamId } = req.params;
    const  sponsor = await repo.addPlayer(teamId, req.body);
    res.status(200).json({
        message: "Player added",
        sponsor
    });
}

export const deletePlayer = async (req: Request, res: Response) => {
    await repo.deletePlayer(req.params.id);
    res.status(200).json({
        message: "Player deleted",
    });
}

export const updatePlayerImage = async (req: Request, res: Response) => {
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
   

    
    await repo.updatePlayerImage(id, image);
    res.status(200).json({
        message: "Player image updated",
    });
}

export const updatePlayer = async (req: Request, res: Response) => {
    await repo.updatePlayer(req.params.id, req.body);
    res.status(200).json({
        message: "Player updated",
    });
}