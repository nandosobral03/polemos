import { init } from "../db";
import fs from "fs";
import path from "path";
import { Player } from "../models/teams.model";
import { deleteImage } from "../utils";

const createUser = async (username: string, password: string) => {
    const db = await init();
    await db.run(
        "INSERT INTO users (id,username, password) VALUES (?,?, ?)",
        [2,username, password]
    );

    await db.exec(
        `INSERT OR IGNORE INTO global_stats (id, type, value, user_id) VALUES
        ('1', 'total_games', 0, '2'),
        ('2', 'longest_game', 0, '2'),
        ('3', 'shortest_game', 9999999, '2');
        `
    )


    return { username, password };
}

const deleteUser = async (username: string) => {
    const db = await init();
    const id = await db.get(
        "SELECT * FROM users WHERE username = ?",
        [username]
    );

    const userImagesToDelete = await db.all(
        "SELECT id FROM users WHERE id = ?",
        [id]
    );

    userImagesToDelete.forEach((player: Player) => {
        deleteImage(player.id!);
    });

    await db.run("DELETE FROM users WHERE username = ?", [username]);
}


export default { createUser, deleteUser };