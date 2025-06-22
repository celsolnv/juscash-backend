import 'reflect-metadata';
import { createConnection } from 'typeorm';

async function connect() {
  await createConnection();
}

export { connect };
