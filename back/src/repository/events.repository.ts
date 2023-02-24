import { init } from "../db";
import { v4 as uuid } from "uuid";
import { Event } from "../models/events.model";

const createEvent = async (userid: string, event: Event) => {
    const db = await init();
    const id = uuid();
    const { attacker_count, victim_count, event_type, direct_damage, reflected_damage, description, victim_status, status_odds } = event;
    await db.run(`
        INSERT INTO events (id, user_id, attacker_count, victim_count, event_type, direct_damage, reflected_damage, description, victim_status, status_odds)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [id, userid, attacker_count, victim_count, event_type, direct_damage, reflected_damage, description, victim_status, status_odds]);

    return {
        ...event,
        id
    };
}

const getEvents = async (userid: string, fullDetails: boolean, gameid?: string, day?: number, type?: string) => {
    const db = await init();
    let select = 'id, attacker_count, victim_count, event_type, direct_damage, reflected_damage, description'
    if(gameid && day) {
        const events = await db.all(`
        SELECT events.id, attacker_count, victim_count, event_type, direct_damage, reflected_damage, description, status_odds, victim_status
        FROM events
        INNER JOIN game_day_events ON events.id = game_day_events.event_id
        WHERE user_id = ? AND game_id = ? AND game_day_number = ?
        `, [userid, gameid, day]);
        return events;
    }
    
    if (fullDetails) {
        select = 'id, attacker_count, victim_count, event_type, direct_damage, reflected_damage, description, victim_status, status_odds'
    }
    if (type) {
        const events = await db.all(`
                SELECT ${select}
                FROM events
                WHERE user_id = ? AND event_type = ?
            `, [userid, type]);
        return events;
    }
    else {
        const events = await db.all(`
                SELECT ${select}
                FROM events
                WHERE user_id = ?
            `, [userid]);
        return events;
    }
}

const deleteEvent = async (userid: string, id: string) => {
    const db = await init();
    await db.run(`
        DELETE FROM events
        WHERE user_id = ? AND id = ?
    `, [userid, id]);

    return;
}

const updateEvent = async (userid: string, id: string, event: Event) => {
    const db = await init();
    const { attacker_count, victim_count, event_type, direct_damage, reflected_damage, description, victim_status, status_odds } = event;
    await db.run(`
        UPDATE events
        SET attacker_count = ?, victim_count = ?, event_type = ?, direct_damage = ?, reflected_damage = ?, description = ?, victim_status = ?, status_odds = ?
        WHERE user_id = ? AND id = ?
    `, [attacker_count, victim_count, event_type, direct_damage, reflected_damage, description, victim_status, status_odds, userid, id]);

    return {
        id,
        ...event
    };
}

const getEventById = async (userid: string, id: string) => {
    const db = await init();
    const event = await db.get(`
        SELECT id, attacker_count, victim_count, event_type, direct_damage, reflected_damage, description, victim_status, status_odds
        FROM events
        WHERE user_id = ? AND id = ?
    `, [userid, id]);
    return event;
}



export default { createEvent, getEvents, deleteEvent, updateEvent, getEventById }