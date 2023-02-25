import sqlite3 from 'sqlite3'
import { open } from 'sqlite'


export const runMigrations = async () => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.cached.Database
        
    })

    await db.exec(`PRAGMA foreign_keys = ON`)

    await db.exec(`CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL)
    `)

    await db.exec(
        `
        INSERT OR IGNORE INTO users (id, username, password) VALUES
        ('1', 'admin', '${process.env.PASSWORD}');
        `
    )
    
    await db.exec(`CREATE TABLE IF NOT EXISTS teams (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        sponsor TEXT NOT NULL,
        user_id TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (sponsor) REFERENCES sponsors (id))
    `)

    await db.exec(`CREATE TABLE IF NOT EXISTS players (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        image TEXT NOT NULL,
        team_id TEXT,
        status TEXT NOT NULL,   
        user_id TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (team_id) REFERENCES teams (id) ON DELETE SET NULL
    )`)

    await db.exec(`CREATE TABLE IF NOT EXISTS sponsors (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        user_id TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE)
    `)

    await db.exec(`CREATE TABLE IF NOT EXISTS player_stats (
        player_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        total_kills INTEGER NOT NULL,
        total_wins INTEGER NOT NULL,
        total_deaths INTEGER NOT NULL,
        FOREIGN KEY (player_id) REFERENCES players (id),
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        PRIMARY KEY (player_id, user_id)
    )`)

    await db.exec(`CREATE TABLE IF NOT EXISTS global_stats (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        value INTEGER NOT NULL,
        user_id TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )`)

    // Insert default global stats
    await db.exec(
        `INSERT OR IGNORE INTO global_stats (id, type, value, user_id) VALUES
        ('1', 'total_games', 0, '1'),
        ('2', 'longest_game', 0, '1'),
        ('3', 'shortest_game', 9999999, '1');
        `
    )


    await db.exec(`CREATE TABLE IF NOT EXISTS status (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        color TEXT NOT NULL,
        damage_reduction INTEGER NOT NULL,
        health_increase INTEGER NOT NULL,
        user_id TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )`)

    await db.exec(`
        INSERT OR IGNORE INTO status (id, name, color, damage_reduction, health_increase, user_id) VALUES
        ('1', 'None', '#000000', 1, 1, '1')`
    );


    await db.exec(`CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        attacker_count INTEGER NOT NULL,
        victim_count INTEGER NOT NULL,
        event_type TEXT NOT NULL,
        direct_damage INTEGER NOT NULL,
        reflected_damage INTEGER NOT NULL,
        description TEXT NOT NULL,
        victim_status TEXT NOT NULL,    
        status_odds INTEGER NOT NULL,
        user_id TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        FOREIGN KEY (victim_status) REFERENCES status (id))
    `)


    await db.exec(`CREATE TABLE IF NOT EXISTS games (
        id TEXT PRIMARY KEY,
        date TEXT NOT NULL,
        user_id TEXT NOT NULL,
        days INTEGER NOT NULL,
        winner TEXT NOT NULL,
        summary TEXT,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE)
    `)

    await db.exec(`CREATE TABLE IF NOT EXISTS game_days(
            number INTEGER NOT NULL,
            game_id TEXT NOT NULL,
            current_players BLOB NOT NULL,
            deaths BLOB NOT NULL,
            FOREIGN KEY (game_id) REFERENCES games (id) ON DELETE CASCADE,
            PRIMARY KEY (number, game_id)
        )`)
    
    await db.exec(`CREATE TABLE IF NOT EXISTS game_day_events(
            event_id TEXT NOT NULL,
            game_day_number INTEGER NOT NULL,
            game_id TEXT NOT NULL,
            players BLOB NOT NULL,
            FOREIGN KEY (event_id) REFERENCES events (id),
            FOREIGN KEY (game_day_number, game_id) REFERENCES game_days (number, game_id) ON DELETE CASCADE,
            PRIMARY KEY (event_id, game_day_number, game_id)
        )`)

    await db.exec(`CREATE TABLE IF NOT EXISTS game_players(
            player_id TEXT NOT NULL,
            game_id TEXT NOT NULL,
            user_id TEXT NOT NULL,
            FOREIGN KEY (player_id) REFERENCES players (id),
            FOREIGN KEY (game_id) REFERENCES games (id) ON DELETE CASCADE,
            PRIMARY KEY (player_id, game_id)
        )`)

        
    return db
}

export const init = async () => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.cached.Database
    })
    return db
}


export default {runMigrations, init}