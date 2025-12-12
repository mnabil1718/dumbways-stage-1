import Database from "better-sqlite3";

export function initSQLi(filename, opts = undefined) {
  const db = new Database(filename, opts);
  db.pragma("journal_mode = WAL"); // concurrency + speed
  createTables(db);
  return db;
}

function createTables(db) {
  const q = `
	CREATE TABLE IF NOT EXISTS projects (
	    id TEXT PRIMARY KEY,
	    name TEXT NOT NULL,
	    start_date TEXT NOT NULL,
	    end_date TEXT,
	    description TEXT,
	    technology TEXT,     
	    imageUrl TEXT          
	);
	`;

  db.prepare(q).run();
}
