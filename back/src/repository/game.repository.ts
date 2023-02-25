import { v4 as uuid } from "uuid";
import { init } from "../db"
import { GamePlayer, Player } from "../models/teams.model";
import { Event } from "../models/events.model";
import { Status } from "../models/status.model";


const startGame = async (userId:string) =>{
    const db = await init();
    let id = uuid();
    await db.run(`INSERT INTO games (id, user_id, date, days, winner) VALUES (?, ?, ?, ?, ?)`, [id, userId, new Date().toISOString(), 0, '']);
    const players = (await db.all(`
        SELECT players.id as id, players.team_id as team_id 
        FROM players
        INNER JOIN teams ON teams.id = players.team_id
        WHERE user_id = ?`, [userId]))
    const events = (await db.all(`SELECT * FROM events WHERE user_id = ?`, [userId]))
    const statuses = (await db.all(`SELECT * FROM status WHERE user_id = ?`, [userId]))
    const {days, all} = runGame(players, events, statuses);
    console.log("Finished running game")

    let firstDay = days[0];
    const rest = days.slice(1);
    
    await db.run(`INSERT INTO game_days (game_id, number,current_players,deaths) VALUES (?, ?, ?, ?)`, [id, 1, JSON.stringify(firstDay.current_players), JSON.stringify(firstDay.dead)]);
    await Promise.all(firstDay.events.map(
        async (event:any) => {
            await db.run(`INSERT INTO game_day_events (game_id, game_day_number, event_id, players) VALUES (?, ?, ?, ?)`, [id, 1, event.id, JSON.stringify(event.players)]);
        }
    ))


  
    setTimeout(
        async () => {
            await Promise.all(rest.map(
                async (day:any, i:number) => {
                    await db.run(`INSERT INTO game_days (game_id, number,current_players,deaths) VALUES (?, ?, ?, ?)`, [id, i+2, JSON.stringify(day.current_players), JSON.stringify(day.dead)]);
                    await Promise.all(day.events.map(   
                        async (event:any) => {
                            await db.run(`INSERT INTO game_day_events (game_id, game_day_number, event_id, players) VALUES (?, ?, ?, ?)`, [id, i+2, event.id, JSON.stringify(event.players)]);
                        }
                    ))
                }
            ))
            console.log("Finished inserting days")
        }, 0
    )
    
    
    setTimeout(
        async () => {
            await recordStats(userId, days.length, JSON.parse(JSON.stringify(all)) || [],id);
        }, 1000
    )
    const summariedPlayers = all?.map((player:any) => {return{
        id: player.id,
        name: player.name,
        kills: player.kills,
    }})

    await db.run(`UPDATE games SET days = ?, winner = ?, summary = ? WHERE id = ?`, [days.length, days[days.length-1].alive[0] || "No one", JSON.stringify(summariedPlayers), id]);
    return {
        id,
        days: days.length,
        winner: days[days.length-1].alive[0] || "No one"
    };
}


const recordStats = async (userId:string, length:number, all:GamePlayer[],id :string) => {
    const db = await init();
    await db.run(`UPDATE global_stats SET value = value + 1 WHERE user_id = ? AND type = 'total_games'`, [userId]);
    const longest_game = await db.get(`SELECT value FROM global_stats WHERE user_id = ? AND type = 'longest_game'`, [userId]);
    const shortest_game = await db.get(`SELECT value FROM global_stats WHERE user_id = ? AND type = 'shortest_game'`, [userId]);
    if(length > longest_game.value) {
        await db.run(`UPDATE global_stats SET value = ? WHERE user_id = ? AND type = 'longest_game'`, [length, userId]);
    }

    if(length < shortest_game.value) {
        await db.run(`UPDATE global_stats SET value = ? WHERE user_id = ? AND type = 'shortest_game'`, [length, userId]);
    }

    for(let player of all){
        const hasStats = await db.get(`SELECT * FROM player_stats WHERE user_id = ? AND player_id = ?`, [userId, player.id]);
        if(!hasStats) {
            await db.run(`INSERT INTO player_stats (user_id, player_id, total_kills, total_deaths, total_wins) VALUES (?, ?, ?, ?, ?)`, [userId, player.id, 0, 0, 0]);
        }

        if(player.health > 0) {
            await db.run(`UPDATE player_stats SET total_wins = total_wins + 1, total_kills = total_kills + ? WHERE user_id = ? AND player_id = ?`, [player.kills, userId, player.id]);
        }else{
            await db.run(`UPDATE player_stats SET total_kills = total_kills + ?, total_deaths = total_deaths + ? WHERE user_id = ? AND player_id = ?`, [player.kills, 1, userId, player.id]);
        }

        await db.run('INSERT INTO game_players (game_id, player_id, user_id) VALUES (?, ?, ?)', [id, player.id, userId]);

    }
    console.log("Recorded stats")
}

const getDay = async (userId:string, gameId:string, day:string) =>{
    const db = await init();
    const dayEventInfo = await db.all(`
        SELECT 
        event_id, 
        players 
        FROM game_day_events
        WHERE game_id = ? AND game_day_number = ? AND game_id IN (SELECT games.id FROM games WHERE games.user_id = ?)

    `, [gameId, day, userId]);
    if(!dayEventInfo) return null;

    const dayInfo = await db.get(`
        SELECT
        current_players,
        deaths
        FROM game_days
        WHERE game_id = ? AND number = ? AND game_id IN (SELECT games.id FROM games WHERE games.user_id = ?)
    `, [gameId, day, userId]);
    if(!dayInfo) return null;


    return {
        current_players: JSON.parse(dayInfo.current_players),
        deaths: JSON.parse(dayInfo.deaths),
        events: dayEventInfo.map(
            a => {
                return{
                    ...a,
                    players: JSON.parse(a.players)
                }
            }
        )
    }
}


const runGame = (players:(Player & { team_id: string })[], events:Event[], statuses:Status[]) => {
    let allPlayers = players.map(
        player => ({ ...player, health: 100,  kills: 0, status: '1', id: player.id!})
    )
    const allEvents = events.slice();
    const days = [];
    let day;
    while(allPlayers.filter(a => a.health > 0).length > 1) {
        day = runDay(allPlayers, allEvents, statuses);
        days.push({
            current_players: day.all.map(player => 
                {
                    const {image, kills,name,team_id, ...rest} = player
                    return rest;
                }
            ).filter(p => p.previousHealth > 0),
            events: day.events,
            dead: day.dead.map(player => player.id),
            alive: day.alive.map(player => player.id),
        });
        allPlayers = day.all;
    }
    return {
        days,
        all : day?.all,
        
    }
}

const runDay = (_all:(GamePlayer &  { team_id:string })[], _events:Event[] , _statuses:Status[]) => {
    const all =  _all.map(player => ({ ...player, previousHealth: player.health, previousStatus: player.status }));
    const events = [..._events].map(e => {return{...e, retries: 0}});
    const notPlayed = all.filter(a => a.health > 0).map(player =>  {return {id: player.id, team_id: player.team_id}});
    const playedEvents = [];
    shuffleArray(notPlayed);
    shuffleArray(events);
    while(notPlayed.length > 0){
        const event = events.shift();
        if(!event) break;
        const playerCount = event?.attacker_count + event?.victim_count;
        if(notPlayed.length < playerCount) continue;
            const players = notPlayed.splice(0, playerCount);
            const atk = players.splice(0, event.attacker_count);
            const def = players.splice(0, event.victim_count);
            if(friendlyFire(atk, def)){
                notPlayed.push(...atk, ...def);
                if(++event.retries > 3){
                    break;
                }
                events.push(event);
                continue;
            } 
        const eventPlayers = [...atk, ...def].map(p => p.id);
        runEvent(event, atk, def, all, _statuses);
        playedEvents.push({id: event.id, players: eventPlayers});
    }
    const alive = all.filter(player => player.health > 0);
    const dead = all.filter(player => player.health <= 0);
    return {
        events: playedEvents,
        alive,
        dead,
        all,
    }
}


const runEvent = (event:Event, atk:{id:string, team_id:string}[], def:{id:string, team_id:string}[], all: GamePlayer[], statuses:Status[]) => {
    let aKills = 0;
    let dKills = 0;
    for(let a of atk) {
        const player = all.find(player => player.id === a.id)!;
        dealDamage(player, event, statuses);
        if(player.health <= 0) {
            dKills++;
        }
    }
    for(let d of def) {
        const player = all.find(player => player.id === d.id)!;
        dealDamage(player, event, statuses, true);
        player.status = event.victim_status;
        if(player.health <= 0) {
            aKills++;
        }
    }
    for(let a of atk) {
        const player = all.find(player => player.id === a.id)!;
        if(aKills > 0 && player.health > 0) {
            player.kills += aKills;
        }
    }

    for(let d of def) {
        const player = all.find(player => player.id === d.id)!;
        if(dKills > 0 && player.health > 0) {
            player.kills += dKills;
        }
    }
}

const dealDamage = (player:GamePlayer, event:Event, statuses:Status[], direct = false) => {
    const property = direct ? 'direct_damage' : 'reflected_damage'
    const damage = event[property];
    const status = statuses.find(status => status.id === player.status);
    const odds = event.status_odds;
    player.status = '1'
    if(Math.random() * 100 < odds && direct){
        player.status = event.victim_status;
    }
    if(status) {
        player.health -= Math.floor(event[property] > 0 ? damage * (status.damage_reduction) : damage * (status.health_increase ));
    }
    else {
        player.health -= damage;
    }
}

const friendlyFire = (atk: {id: string, team_id: string}[], def: {id: string, team_id: string}[]) => {
    for(let a of atk){
        for(let d of def){
            if(a.team_id === d.team_id) return true;
        }
    }
    return false;
}




const shuffleArray = (array:any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }



const getGames = async ( userId: string ) => {
    const db = await init();
    const games = await db.all(`SELECT 
        id,
        date,
        days,
        winner,
        user_id
    FROM games WHERE user_id = ?`, userId);
    return games;
}

const getGameInfo = async ( gameId: string, userId: string ) => {
    const db = await init();
    const gameInfo = await db.get(`
        SELECT 
            id,
            date,
            days,
            winner,
            user_id
        FROM  games
        WHERE id = ? AND user_id = ?`, gameId, userId);

    if(!gameInfo) throw new Error('Game not found');

    const dayInfo = [];
    let prevDead = 0;
    for(let i = 0; i < gameInfo.days; i++){
        const eventCount = await db.get(`
            SELECT
                COUNT(*) as count
            FROM game_day_events
            WHERE game_id = ? AND game_day_number = ?`, gameId, i+1);

        const deathCount = await db.get(`
            SELECT
                deaths
            FROM game_days
            WHERE game_id = ? AND number = ?`, gameId, i+1);

        let dead = JSON.parse(deathCount.deaths);
        dayInfo.push({ events: eventCount.count , dead: dead.length - prevDead, number: i+1 });
        prevDead = dead.length;
    }
    return {
        ...gameInfo,
        days: dayInfo,
    }


}


const getGameSummary = async ( gameId: string, userId: string ) => {
    const db = await init();
    const gameInfo = await db.get(`
        SELECT
            *
        FROM  games
        WHERE id = ? AND user_id = ?`, gameId, userId);
    gameInfo.summary = JSON.parse(gameInfo.summary);
    return gameInfo;
}


const getPlayerStory = async ( gameId: string, playerId: string, userId:string ) => {
    const db = await init();
    const gameInfo = await db.all(`
        SELECT
            e.*, ge.players, gd.number
        FROM game_day_events ge
        JOIN game_days gd ON gd.game_id = ge.game_id AND gd.number = ge.game_day_number
        JOIN games g ON g.id = ge.game_id
        JOIN events e ON e.id = ge.event_id
        WHERE g.id = ?
        AND g.user_id = ?
        AND ge.players LIKE ?`, gameId, userId, `%${playerId}%`);

    gameInfo.forEach(event => {
        event.players = JSON.parse(event.players);
    });

    return gameInfo;

}

const getGamePlayers = async ( gameId: string, userId: string ) => {
    const db = await init();
    const players = await db.all(`
        SELECT
            player_id as id
        FROM game_players
        WHERE game_id = ? AND user_id = ?`, gameId, userId);
    return players;
}


export default { startGame, getDay, getGames, getGameInfo, getGameSummary, getPlayerStory, getGamePlayers }