// database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'ramais.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS ramais (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        filial TEXT NOT NULL,
        setor TEXT NOT NULL,
        pessoa TEXT NOT NULL,
        ramal TEXT NOT NULL
    )`);
});

module.exports = db;
