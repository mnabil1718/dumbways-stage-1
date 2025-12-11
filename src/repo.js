import SQLiDB from "./db.js";

class Repository {
  /**
   * @param {SQLiDB} db
   * */
  constructor(db) {
    this.db = db;
  }

  insert(project) {
    console.log("project", project);
    const q = this.db
      .prepare(
        `
		    INSERT INTO projects
		    (id, name, start_date, end_date, description, technology, image)
		    VALUES (?, ?, ?, ?, ?, ?, ?)
		`,
      )
      .run(
        project.id,
        project.name,
        project.startDate,
        project.endDate,
        project.description,
        project.technology,
        project.image,
      );
    console.log("insert", q);
  }

  getAll() {
    const rows = this.db
      .prepare(
        `
    SELECT * FROM projects
`,
      )
      .all();
    console.log("rows", rows);
  }
}

export default Repository;
