import { init } from "../db";
import { v4 as uuid } from "uuid";
import { Event } from "../models/events.model";

const createEvent = async (userid: string, event:Event) => {
    const db = await init();
    const id = uuid();
    const {attacker_count, victim_count, event_type, direct_damage, reflected_damage, description, victim_status, status_odds} = event;
    await db.run(`
        INSERT INTO events (id, user_id, attacker_count, victim_count, event_type, direct_damage, reflected_damage, description, victim_status, status_odds)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [id, userid, attacker_count, victim_count, event_type, direct_damage, reflected_damage, description, victim_status, status_odds]);

    return {
        id,
        ...event
    };
}

const getEvents = async (userid: string, type?: string) => {
    const db = await init();
    
    if(type){
        const events = await db.all(`
            SELECT id, attacker_count, victim_count, event_type, direct_damage, reflected_damage, description, victim_status, status_odds
            FROM events
            WHERE user_id = ? AND event_type = ?
        `, [userid, type]);
        return events;
    }
    else{
        const events = await db.all(`
            SELECT id, attacker_count, victim_count, event_type, direct_damage, reflected_damage, description, victim_status, status_odds
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

const updateEvent = async (userid: string, id: string, event:Event) => {
    const db = await init();
    const {attacker_count, victim_count, event_type, direct_damage, reflected_damage, description, victim_status, status_odds} = event;
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

export default {  createEvent, getEvents, deleteEvent, updateEvent };