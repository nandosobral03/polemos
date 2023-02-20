import { init } from "../db";

const getUser = async (username: string, password: string) => {
    const db = await init();
    const user = await db.get(`
        SELECT id, username, password
        FROM users
        WHERE username = ? AND password = ?
    `, [username, password]);
    return user;
}

export default { getUser };