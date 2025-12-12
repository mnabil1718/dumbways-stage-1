import Database from "better-sqlite3";
import { projectMapper, singleProjectMapper } from "./helper/mapper.js";

class Repository {
  /**
   * @param {Database} db
   * */
  constructor(db) {
    this.db = db;
  }

  insert(project) {
    const q = `
	      INSERT INTO projects
	      (id, name, start_date, end_date, description, technology, imageUrl)
	      VALUES (?, ?, ?, ?, ?, ?, ?)
	      `;

    this.db
      .prepare(q)
      .run(
        project.id,
        project.name,
        project.startDate,
        project.endDate,
        project.description,
        project.technology,
        project.imageUrl,
      );
  }

  getAll() {
    const q = `
		  SELECT * FROM projects
		  `;

    const rows = this.db.prepare(q).all();
    return projectMapper(rows);
  }

  getById(id) {
    const q = `
	      SELECT * FROM projects WHERE id = ?
	      `;
    const row = this.db.prepare(q).get(id);
    return singleProjectMapper(row);
  }
}

export default Repository;
