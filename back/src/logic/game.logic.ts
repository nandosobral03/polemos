import { Status } from "../models/status.model";
import { GamePlayer, Player } from "../models/teams.model";
import { Event } from "../models/events.model";

export const runGame = (players:(Player & { team_id: string })[], events:Event[], statuses:Status[]) => {
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


