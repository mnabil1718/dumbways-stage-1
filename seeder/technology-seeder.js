import "dotenv/config";
import { getPool } from "../src/db/postgresql.js";

const technologies = [
  "Typescript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Go",
  "Flutter",
];

async function run() {
  try {
    const pool = getPool();
    // param ($1), ($2), ($3) etc.
    const values = technologies.map((_, i) => `($${i + 1})`).join(", ");

    const q = {
      text: `
	   INSERT INTO technologies (name) 
	   VALUES ${values} ON CONFLICT DO NOTHING;
	      `,
      values: technologies,
    };
    await pool.query(q);
  } catch (error) {
    console.log(error);
  }
}

run();
