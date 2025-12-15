import { Pool } from "pg";
import TechnologyRepository from "../abstract/technology-repository.js";

class TechnologyRepositoryPostgresql extends TechnologyRepository {
  /***
   * @param {Pool} pool
   */
  constructor(pool) {
    super();
    this._pool = pool;
  }

  async getAll() {
    const q = {
      text: `SELECT * FROM technologies`,
    };

    const res = await this._pool.query(q);
    return res.rows;
  }
}

export default TechnologyRepositoryPostgresql;
