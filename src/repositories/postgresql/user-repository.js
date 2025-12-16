import { Pool } from "pg";

class UserRepositoryPostgresql {
  /***
   * @param {Pool} pool
   */
  constructor(pool) {
    this._pool = pool;
  }

  async insert({ name, email, password }) {
    const id = crypto.randomUUID();
    const q = {
      text: `INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)`,
      values: [id, name, email, password],
    };

    const res = await this._pool.query(q);

    if (!res.rowCount) {
      throw new Error("Failed to register user");
    }
  }

  async getByEmail(email) {
    const q = {
      text: `SELECT id, name, email, password FROM users WHERE email = $1`,
      values: [email],
    };

    const res = await this._pool.query(q);

    if (res.rowCount) {
      throw new Error("User not found");
    }

    return res.rows[0];
  }
}

export default UserRepositoryPostgresql;
