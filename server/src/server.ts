import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('✅ Database connected');

    server = app.listen(config.port, () => {
      console.log(`🚀 App is listening on port ${config.port}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to the database', err);
  }
}

main();

process.on('unhandledRejection', (err) => {
  console.error('😈 Unhandled Rejection detected. Shutting down...', err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on('uncaughtException', (err) => {
  console.error('😈 Uncaught Exception detected. Shutting down...', err);
  process.exit(1);
});

