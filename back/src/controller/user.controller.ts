import{Request, Response} from 'express';

import repo from '../repository/user.repository';

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await repo.createUser(req.body.username, req.body.password);
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id =  req.params.id;
        const user = await repo.deleteUser(id);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

