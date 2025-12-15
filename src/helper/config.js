export const config = {
  port: process.env.PORT,
  pg: {
    pguser: process.env.PGUSER,
    pghost: process.env.PGHOST,
    pgpassword: process.env.PGPASSWORD,
    pgdatabase: process.env.PGDATABASE,
    pgport: process.env.PGPORT,
  },
};
