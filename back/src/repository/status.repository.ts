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
    if(statuses.some(status => status.id == "1")){
        return statuses;
    }
    const normal = await db.get(`SELECT * FROM status WHERE id = 1`);
    statuses.push(normal);
    return statuses;
}

const deleteStatus = async (userid:string, id:string) => {
    const db = await init();
    await db.run(`DELETE FROM status WHERE id = ? AND user_id = ?`, [id, userid]);
}

const editStatus = async (userid:string, id:string, status:Status) => {
    const db = await init();
    const {name , color, health_increase, damage_reduction} = status;
    await db.run(`UPDATE status SET name = ?, color = ?, health_increase = ?, damage_reduction = ? WHERE id = ? AND user_id = ?`, [name, color, health_increase, damage_reduction, id, userid]);
}

export default { createStatus , getStatuses, deleteStatus , editStatus }