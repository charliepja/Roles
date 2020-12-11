const Database = require('better-sqlite3');
const db = new Database('settings.sqlite');

const tables = new Map();

tables.set('settings', 'id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, guild TEXT NOT NULL, name TEXT NOT NULL, value TEXT NOT NULL');
tables.set('roles', 'id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, guild TEXT NOT NULL, name TEXT NOT NULL, value TEXT NOT NULL UNIQUE');

for(const [key, value] of tables.entries()) {
	db.prepare(`CREATE TABLE IF NOT EXISTS ${key} (${value});`).run();
}
db.pragma('synchronous = 1');
db.pragma('journal_mode = WAL');

module.exports = db;