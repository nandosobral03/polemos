import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import repo from '../repository/auth.repository';

export const login = async (req: Request, res: Response) => {
    const correctPassword = process.env.PASSWORD;
    const secret = process.env.JWT_SECRET;
    const { username,password } = req.body;
    const user = await repo.getUser(username, password);
    if (user) {
        const token = jwt.sign({ sub: user.id, username }, secret || '');
        res.status(200).json({token });
    }
    else {
        res.status(401).json({  message: 'Incorrect username or password' });
    }

}

export default { login};