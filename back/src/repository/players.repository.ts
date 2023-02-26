import { v4 as uuid } from "uuid";
import { init } from "../db";
import { Player } from "../models/teams.model";
import path from "path";
import fs from "fs";
import { compressImage } from "../utils";


const createPlayer = async (player: Player, user: string) => {
    const db = await init();
    const id = uuid();
    await db.run(`
        INSERT INTO players (id, name, image, status, team_id, user_id)
        VALUES (?, ?, ?, ?,?,?)
    `, [id, player.name, `${process.env.URL}/static/default.png`, "ACTIVE",
        player.team_id ? player.team_id : null
        , user]);

    await db.run(`
        INSERT INTO player_stats (player_id, total_kills, total_deaths, total_wins, user_id)
        VALUES (?, ?, ?, ?, ?)
    `, [id, 0, 0, 0, user]);

    
    return { id, ...player }
}

const deletePlayer = async (id: string, user: string) => {
    const db = await init();
    await db.run(`
        UPDATE players
        SET status = ?, team_id = ?
        WHERE id = ? AND user_id = ?
    `, ['DELETED',null, id, user]);
    return;
}

const updatePlayerImage = async (id: string, image: { data: Buffer, name: string, size: number, mimetype: string, md5: string }, user: string) => {
    let player = await getPlayer(id, user);
    if (!player) {
        throw {
            status: 404,
            message: "Player not found"
        }
    }

    let ext = path.extname(image.name);
    await saveImage(id, image);
    setTimeout(async () => {
        await compressImage(ext, id);
    }, 0);
}


const getPlayer = async (id: string, user: string) => {
    const db = await init();
    const player = await db.get(`
        SELECT players.*, teams.name as team, player_stats.total_kills as total_kills, total_wins as total_wins, total_deaths as total_deaths
        FROM players
        LEFT JOIN teams ON players.team_id = teams.id
        JOIN player_stats ON players.id = player_stats.player_id
        WHERE players.id = ? AND players.user_id = ?
    `, [id, user]);
    return player;
}

const getPlayers = async (user: string, all: boolean = false) => {
    const db = await init();
    if (all) {
        const players = await db.all(`
            SELECT players.* , teams.name as team
            FROM players
            LEFT JOIN teams ON players.team_id = teams.id
            WHERE players.user_id = ?

        `, [user]);
        return players;
    }
    const players = await db.all(`
        SELECT players.* , teams.name as team 
        FROM players
        LEFT JOIN teams ON players.team_id = teams.id
        WHERE  players.user_id = ? AND status = ?
    `, [user, "ACTIVE"]);
    return players;
}


const saveImage = async (id: string, image: { data: Buffer, name: string, size: number, mimetype: string, md5: string }) => {
    let ext = path.extname(image.name);
    const imageDir = path.join(__dirname, "..", "images");
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


const updatePlayer = async (id: string, player: Player, user: string) => {
    const db = await init();
    await db.run(`
        UPDATE players
        SET name = ?, team_id = ?
        WHERE id = ? AND user_id = ?
    `, [player.name, player.team_id ? player.team_id : null, id, user]);
}


const setCompressedImage = async (id: string, ext: string) => {
    const db = await init();
    let imageName = `${process.env.URL}/static/compressed/${id}${ext}`;
    await db.run(`
        UPDATE players
        SET image = ?
        WHERE id = ?
    `, [imageName, id]);
}


export default { createPlayer, deletePlayer, updatePlayerImage, updatePlayer, setCompressedImage, getPlayers , getPlayer }