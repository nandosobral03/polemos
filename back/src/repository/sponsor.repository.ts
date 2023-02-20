import { init } from "../db";
import { v4 as uuid } from "uuid";

const getSponsors = async (userid: string) => {
    const db = await init();
    
    const sponsors = await db.all(`
        SELECT id, name
        FROM sponsors
        WHERE user_id = ?
    `, [userid]);

    return sponsors;
}

const createSponsor = async (userid: string, name: string) => {
    const db = await init();
    const id = uuid();
    await db.run(`
        INSERT INTO sponsors (id, user_id, name)
        VALUES (?, ?, ?)
    `, [id, userid, name]);

    return { id, name}
}

const deleteSponsor = async (userid: string, id: string) => {
    const db = await init();
    await db.run(`
        DELETE FROM sponsors
        WHERE user_id = ? AND id = ?
    `, [userid, id]);

    return;
}

export default { getSponsors, createSponsor, deleteSponsor };