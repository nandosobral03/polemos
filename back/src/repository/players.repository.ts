import { v4 as uuid } from "uuid";
import { init } from "../db";
import { Player } from "../models/teams.model";
import path from "path";
import fs from "fs";
import { compressImage } from "../utils";


const addPlayer = async (teamId: string, player: Player) => {
    const db = await init();
    const id = uuid();
    await db.run(`
        INSERT INTO players (id, team_id, name, image)
        VALUES (?, ?, ?, ?)
    `, [id, teamId, player.name, `${process.env.URL}/static/default.png`]);
    return { id, ...player}
}

const deletePlayer = async (id: string) => {
    const db = await init();
    await db.run(`
        DELETE FROM players
        WHERE id = ?
    `, [ id]);
    return;
}

const updatePlayerImage = async ( id: string, image: { data: Buffer, name: string, size: number, mimetype: string, md5: string }) => {
    let ext = path.extname(image.name);
    await saveImage(id, image);
    setTimeout(async () => {
        await compressImage(ext, id);
    }, 0);
}

const saveImage = async (id:string, image: { data: Buffer, name: string, size: number, mimetype: string, md5: string }) => {
    let ext = path.extname(image.name);
    const imageDir =  path.join(__dirname, "..", "images");
    const imagePath = path.join(imageDir, `${id}${ext}`);
    {
        const files = fs.readdirSync(imageDir);
        const toRemove = files.filter((file: string) => file.startsWith(`${id}.`));
        toRemove.forEach((file: any) => {
            fs.unlinkSync(path.join(imageDir, file));
        });
    }
    fs.writeFileSync(imagePath, image.data);
}


const updatePlayer = async ( id: string, player: Player) => {
    const db = await init();
    await db.run(`
        UPDATE players
        SET name = ?
        WHERE id = ?
    `, [player.name, id]);
}


const setCompressedImage = async (id: string, ext: string) => {
    const db = await init();
    let imageName = `${process.env.URL}/static/compressed/${id}${ext}`;
    await db.run(`
        UPDATE players
        SET image = ?
        WHERE id = ?
    `, [imageName,  id]);
}


export default { addPlayer, deletePlayer, updatePlayerImage, updatePlayer , setCompressedImage}