import { init } from "../db";

const getStats = async (userid: string) => {
    const db = await init();
    
    const stats = await db.all(`
        SELECT
        type,
        value
        FROM global_stats
        WHERE user_id = ?
    `, [userid]);

    return Object.fromEntries(stats.map(a => [a.type, a.value]));
}

const resetStats = async (userid: string) => {
    const db = await init();
    await db.run(`UPDATE global_stats SET value = 0 WHERE user_id = ? AND type = ?`, [userid, "total_games"]);
    await db.run(`UPDATE global_stats SET value = 0 WHERE user_id = ? AND type = ?`, [userid, "longest_game"]);
    await db.run(`UPDATE global_stats SET value = 9999999 WHERE user_id = ? AND type = ?`, [userid, "shortest_game"]);
    await db.run(`DELETE FROM games WHERE user_id = ?`, [userid])
    await db.run(`DELETE FROM player_stats WHERE user_id = ?`, [userid])
}


export default { getStats, resetStats }