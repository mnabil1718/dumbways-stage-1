import Database from "better-sqlite3";

class SQLiDB {
  constructor(filename, opts = undefined) {
    this.db = new Database(filename, opts);
    this.db.pragma("journal_mode = WAL"); // performance reason
    this.createTables();
  }

  createTables() {
    const q = `
	CREATE TABLE IF NOT EXISTS projects (
	    id TEXT PRIMARY KEY,
	    name TEXT NOT NULL,
	    start_date TEXT NOT NULL,
	    end_date TEXT,
	    description TEXT,
	    technology TEXT,     
	    image BLOB          
	);
	`;

    this.db.prepare(q).run();
  }
}

export default SQLiDB;
