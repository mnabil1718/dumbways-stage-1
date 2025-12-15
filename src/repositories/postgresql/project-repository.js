import { Pool } from "pg";
import ProjectRepository from "../abstract/project-repository.js";
import { projectMapper, singleProjectMapper } from "../../helper/mapper.js";

class ProjectRepositoryPostgresql extends ProjectRepository {
  /***
   * @param {Pool} pool
   */
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async insert({
    id,
    name,
    startDate,
    endDate,
    description,
    imageUrl,
    technologies,
  }) {
    let q = {
      text: `INSERT INTO projects 
             (id, name, start_date, end_date, description, image_url) 
             VALUES ($1, $2, $3, $4, $5, $6)`,
      values: [id, name, startDate, endDate, description, imageUrl],
    };

    let res = await this._pool.query(q);
    if (!res.rowCount) {
      throw new Error("Failed to add project");
    }

    q = {
      text: `INSERT INTO project_technologies (project_id, technology_id)
		   SELECT $1::uuid, UNNEST($2::int[])`,
      values: [id, technologies],
    };

    res = await this._pool.query(q);
    if (!res.rowCount) {
      throw new Error("Failed to add technologies");
    }
  }

  async getAll() {
    const q = {
      text: `
      SELECT
        p.*,
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', t.id,
              'name', t.name
            )
            ORDER BY t.name
          ) FILTER (WHERE t.id IS NOT NULL),
          '[]'
        ) AS technology
      FROM projects p
      LEFT JOIN project_technologies pt
        ON pt.project_id = p.id
      LEFT JOIN technologies t
        ON t.id = pt.technology_id
      GROUP BY p.id
      ORDER BY p.name;
    `,
    };

    const res = await this._pool.query(q);
    return projectMapper(res.rows);
  }

  async getById(id) {
    const q = {
      text: `
      SELECT
        p.*,
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', t.id,
              'name', t.name
            )
            ORDER BY t.name
          ) FILTER (WHERE t.id IS NOT NULL),
          '[]'
        ) AS technology
      FROM projects p
      LEFT JOIN project_technologies pt
        ON pt.project_id = p.id
      LEFT JOIN technologies t
        ON t.id = pt.technology_id
      WHERE p.id = $1
      GROUP BY p.id
    `,
      values: [id],
    };

    const res = await this._pool.query(q);

    if (!res.rowCount) {
      throw new Error("Project not found");
    }

    return singleProjectMapper(res.rows[0]);
  }

  async update({
    id,
    name,
    startDate,
    endDate,
    description,
    imageUrl,
    technologies,
  }) {
    let q = {
      text: `
      UPDATE projects
      SET name = $1,
          start_date = $2,
          end_date = $3,
          description = $4,
          image_url = $5
      WHERE id = $6
    `,
      values: [name, startDate, endDate, description, imageUrl, id],
    };

    let res = await this._pool.query(q);
    if (!res.rowCount) {
      throw new Error("Failed to update project");
    }

    q = {
      text: `DELETE FROM project_technologies WHERE project_id = $1`,
      values: [id],
    };

    await this._pool.query(q);

    if (technologies?.length) {
      q = {
        text: `
        INSERT INTO project_technologies (project_id, technology_id)
        SELECT $1::uuid, UNNEST($2::int[])
      `,
        values: [id, technologies],
      };

      await this._pool.query(q);
    }
  }

  async delete(id) {
    const q = {
      text: `DELETE FROM projects WHERE id = $1`,
      values: [id],
    };

    const res = await this._pool.query(q);

    if (!res.rowCount) {
      throw new Error("Failed to delete project");
    }
  }
}

export default ProjectRepositoryPostgresql;
