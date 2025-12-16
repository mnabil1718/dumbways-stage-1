/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createDomain("email", {
    type: "CITEXT",
    options: {
      check: "VALUE ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'",
    },
  });
  pgm.createTable("users", {
    id: {
      type: "UUID",
      primaryKey: true,
    },

    email: {
      type: "email",
      notNull: true,
      unique: true,
    },

    name: {
      type: "TEXT",
      notNull: true,
    },

    password: {
      type: "TEXT",
      notNull: true,
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("users");
  pgm.dropDomain("email", {
    ifExists: true,
  });
};
