import TestAgent from 'supertest/lib/agent';

declare global {
  namespace NodeJS {
    interface Global {
      agent: TestAgent;
      databaseName: string;
    }
  }
}
