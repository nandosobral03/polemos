import { init } from "../db"
import { v4 as uuid } from "uuid";
import { Status } from "../models/status.model";

const createStatus = async (userid:string, status: Status) => {
    const db = await init();
    const id = uuid();
    const {name , color, health_increase, damage_reduction} = status;
    await db.run(`INSERT INTO status (id, name, color, health_increase, damage_reduction, user_id) VALUES (?,?, ?, ?, ?, ?)`, [id,name, color, health_increase, damage_reduction, userid]);
    return {id, ...status};
}

const getStatuses = async (userid:string) => {
    const db = await init();
    const statuses = await db.all(`SELECT * FROM status WHERE user_id = ?`, [userid]);
    return statuses;
}

const deleteStatus = async (userid:string, id:string) => {
    const db = await init();
    await db.run(`DELETE FROM status WHERE id = ? AND user_id = ?`, [id, userid]);
}


export default { createStatus , getStatuses, deleteStatus };