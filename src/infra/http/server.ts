import 'reflect-metadata';
import { createServer } from 'http';
import { app } from '../../app';
import { EnvSettings } from '../../configs/Env';
import { connect } from '../database/typeorm/connection';

const { PORT } = EnvSettings;

const server = createServer(app);

if (EnvSettings.NODE_ENV !== 'test') {
  connect().then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} 🚀`);
    });
  });
}

export { server };
