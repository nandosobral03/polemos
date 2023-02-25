import { init } from "../db";
import { Team } from "../models/teams.model";
import { v4 as uuid } from "uuid";

const getTeams = async (userid: string, includePlayers: boolean = false) => {
    const db = await init();
    const teams = await db.all(`
        SELECT teams.id AS id, teams.name AS name, teams.sponsor AS sponsor
        FROM teams
        WHERE teams.user_id = ?
    `, [userid]);
    if (includePlayers){
        for (let team of teams) {
            let players = await db.all(`
                SELECT players.id AS id, players.name AS name, players.image AS image
                FROM players, teams
                WHERE players.team_id = teams.id
                AND teams.id = ?
            `, [team.id]);
            team.players = players;
        }
    }else{
        teams.map(team => {
            team.players = undefined;
        })
    }
    return teams;
}

const createTeam = async (userid: string, team:Team) => {
    const db = await init();
    const id = uuid();
    await db.run(`
        INSERT INTO teams (id, user_id, name, sponsor)
        VALUES (?, ?, ?, ?)
    `, [id, userid, team.name, team.sponsor]);
    const players: {id:string, name:string}[] = [];
    for (let player of team.players) {
        const playerId = uuid();
        players.push({ id: playerId, name: player.name })
        await db.run(`
            INSERT INTO players (id, team_id, name, image)
            VALUES (?, ?, ?, ?)
        `, [playerId, id, player.name, `${process.env.URL}/static/default.png`]);
    }

    return { id, name: team.name, players};
}

const deleteTeam = async (userid: string, id: string) => {
    const db = await init();

    await db.run(`
        DELETE FROM players
        WHERE team_id = ?
    `, [id]);

    await db.run(`
        DELETE FROM teams
        WHERE user_id = ? AND id = ?
    `, [userid, id]);
    return;
}

const updateTeam = async (userid: string, id: string, team: Team) => {
    const db = await init();
    await db.run(`
        UPDATE teams
        SET name = ?, sponsor = ?
        WHERE user_id = ? AND id = ?
    `, [team.name, team.sponsor, userid, id]);
}



export default { getTeams, createTeam, deleteTeam, updateTeam }
