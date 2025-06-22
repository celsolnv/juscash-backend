module.exports = {
  type: process.env.DB_TYPE,
  url: process.env.DB_URL,
  synchronize: false,
  logging: false,
  entities: [process.env.DB_ENTITIES],
  migrations: [process.env.DB_MIGRATIONS],
  subscribers: [process.env.DB_SUBSCRIBERS],
  cli: {
    entitiesDir: process.env.DB_ENTITIES_DIR,
    migrationsDir: process.env.DB_MIGRATIONS_DIR,
    subscribersDir: process.env.DB_SUBSCRIBERS_DIR
  }
};
