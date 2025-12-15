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
  pgm.createTable("project_technologies", {
    id: "id",
    project_id: {
      type: "UUID",
      notNull: true,
      references: "projects",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    technology_id: {
      type: "INTEGER",
      notNull: true,
      references: "technologies",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  });

  // indexes
  pgm.createIndex("project_technologies", "project_id");
  pgm.createIndex("project_technologies", "technology_id");
  pgm.addConstraint(
    "project_technologies",
    "unique_project_and_technology",
    "UNIQUE(project_id, technology_id)",
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropIndex("project_technologies", "project_id");
  pgm.dropIndex("project_technologies", "technology_id");
  pgm.dropTable("project_technologies");
};
