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
  pgm.createTable("projects", {
    id: {
      type: "UUID",
      primaryKey: true,
    },
    name: {
      type: "TEXT",
      notNull: true,
    },

    start_date: {
      type: "DATE",
      notNull: true,
    },

    end_date: {
      type: "DATE",
      notNull: true,
    },

    description: {
      type: "TEXT",
      notNull: true,
    },

    image_url: {
      type: "TEXT",
      notNull: false,
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("projects");
};
