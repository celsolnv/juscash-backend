import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { resolve } from 'path';
import { createConnection } from 'typeorm';
import crypto from 'crypto';

async function createTestConnection() {
  const { parsed: env } = dotenv.config({
    path: resolve(__dirname, '..', '..', '..', '..', '.env.test')
  });

  const databaseName = `juscash_test_${crypto.randomBytes(8).toString('hex')}`;

  const mysqlConnection = await mysql
    .createConnection({
      host: env?.DB_HOST,
      user: env?.DB_USER,
      password: env?.DB_PASSWORD,
      port: 3307
    })
    .catch((error) => {
      throw new Error(`Error creating mysql connection: ${error}`);
    });

  await mysqlConnection.execute(`CREATE SCHEMA ${databaseName}`);

  await mysqlConnection.end();

  await createConnection({
    name: 'default',
    type: 'mysql',
    host: env?.DB_HOST as string,
    port: env?.DB_PORT ? +env.DB_PORT : 3306,
    database: databaseName,
    username: env?.DB_USER,
    password: env?.DB_PASSWORD,
    entities: [env?.DB_ENTITIES as string],
    migrations: [env?.DB_MIGRATIONS as string],
    subscribers: [env?.DB_SUBSCRIBERS as string],
    cli: {
      entitiesDir: env?.DB_ENTITIES_DIR as string,
      migrationsDir: env?.DB_MIGRATIONS_DIR as string,
      subscribersDir: env?.DB_SUBSCRIBERS_DIR as string
    },
    migrationsRun: true,
    synchronize: false,
    logging: false,
    dropSchema: true
  });

  return databaseName;
}

export { createTestConnection };
